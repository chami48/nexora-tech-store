import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();

// Exercise the actual TypeScript modules with the project's existing compiler.
function load(relative) {
  const filename = path.join(root, relative);
  if (cache.has(filename)) return cache.get(filename).exports;
  const compiled = new Module(filename);
  cache.set(filename, compiled);
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = (id) => id.startsWith("@/") ? load(`${id.slice(2)}.ts`) : originalRequire(id);
  compiled._compile(ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return compiled.exports;
}

const { products } = load("data/products.ts");
const { getProductPrice, getProductSpecifications } = load("lib/product-options.ts");
const { parseCartItems } = load("lib/cart-items.ts");
const { compareKey, addCompareId, removeCompareId, parseCompareIds, createCompareStore, hasDifferentValues } = load("lib/compare.ts");
const { createDemoOrder, validateCustomer, readCustomer, orderEnquiry, ordersKey } = load("lib/demo-orders.ts");
const macbook = products.find((product) => product.id === "macbook-air-m4");
const customer = { name: "Demo Customer", email: "demo@example.com", phone: "+94700000000", address: "123 Demo Street", city: "Colombo", postal: "00100", notes: "Demo only" };
const item = { key: "demo-512", productId: macbook.id, quantity: 2, storage: "512gb", color: macbook.colors[0].value, unitPrice: getProductPrice(macbook, "512gb") };
function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test("storage selection changes price/specifications without mutating product data", () => {
  assert.equal(getProductPrice(macbook, "256gb"), 399900);
  assert.equal(getProductPrice(macbook, "512gb"), 459900);
  assert.equal(getProductPrice(macbook, "1tb"), 519900);
  assert.equal(getProductSpecifications(macbook, "512gb").Storage, "512GB SSD");
  assert.equal(macbook.specifications.Storage, "256GB SSD");
  const unpriced = { ...macbook, storage: [{ label: "512GB", value: "512gb" }] };
  assert.equal(getProductPrice(unpriced, "512gb"), unpriced.price);
  assert.equal(getProductPrice(products.find((product) => !product.storage)), products.find((product) => !product.storage).price);
});

test("legacy saved carts migrate variant prices and reject malformed items", () => {
  const { unitPrice, ...legacy } = item;
  assert.equal(parseCartItems(JSON.stringify([legacy]))[0].unitPrice, unitPrice);
  assert.equal(parseCartItems(JSON.stringify([{ ...item, unitPrice: 123 }]))[0].unitPrice, 123);
  assert.deepEqual(parseCartItems("broken"), []);
  assert.deepEqual(parseCartItems(JSON.stringify([{ ...item, quantity: 100 }, { ...item, productId: "missing" }, { ...item, storage: {} }])), []);
});

test("delivery validation rejects invalid fields and trims form input", () => {
  assert.equal(validateCustomer(customer), "");
  for (const field of ["name", "email", "phone", "address", "city", "postal"]) assert.notEqual(validateCustomer({ ...customer, [field]: " " }), "");
  assert.notEqual(validateCustomer({ ...customer, phone: "letters123456789" }), "");
  const form = new FormData();
  Object.entries(customer).forEach(([key, value]) => form.set(key, ` ${value} `));
  assert.deepEqual(readCustomer(form), customer);
});

test("orders save unique IDs, timestamps, customer and variant-price totals", () => {
  const storage = memoryStorage();
  const first = createDemoOrder([item], customer, storage);
  const second = createDemoOrder([item], customer, storage);
  assert.notEqual(first.id, second.id);
  assert.match(first.id, /^NEXORA-DEMO-/);
  assert.ok(Number.isFinite(Date.parse(first.timestamp)));
  assert.equal(first.items[0].variants.storage, "512GB");
  assert.equal(first.items[0].unitPrice, 459900);
  assert.equal(first.totals.total, 919800);
  assert.deepEqual(first.customer, customer);
  assert.equal(JSON.parse(storage.getItem(ordersKey)).length, 2);
});

test("failed saves, corrupt history and invalid carts do not alter cart inputs", () => {
  const original = structuredClone(item);
  assert.throws(() => createDemoOrder([item], customer, { getItem: () => null, setItem: () => { throw Error("quota exceeded"); } }), /quota/);
  assert.throws(() => createDemoOrder([item], customer, { getItem: () => "{}", setItem: () => assert.fail("must not overwrite") }));
  assert.throws(() => createDemoOrder([], customer, memoryStorage()), /empty/);
  assert.throws(() => createDemoOrder([{ ...item, storage: "missing" }], customer, memoryStorage()), /storage/);
  assert.deepEqual(item, original);
});

test("contact handoff contains selected variants, quantities, prices and delivery details", () => {
  const enquiry = orderEnquiry([item], customer);
  for (const value of ["512GB", "Qty 2", "459900", "919800", customer.address, customer.email]) assert.ok(enquiry.includes(value));
  const order = createDemoOrder([item], customer, memoryStorage());
  assert.ok(orderEnquiry([], undefined, order).includes(order.id));
});

test("new-arrivals comparator handles missing flags", () => {
  const source = readFileSync(path.join(root, "components/shop/shop-content.tsx"), "utf8");
  const comparator = source.match(/case "newest":\s*return ([^;]+);/)[1];
  const compare = new Function("a", "b", `return ${comparator}`);
  const sorted = [{ id: "old" }, { id: "new", newArrival: true }, { id: "other", newArrival: false }].sort(compare);
  assert.equal(sorted[0].id, "new");
  assert.equal(compare({}, {}), 0);
});

test("compare selections add/remove without duplicates or input mutation", () => {
  const ids = [products[0].id];
  const added = addCompareId(ids, products[1].id);
  assert.deepEqual(added, [products[0].id, products[1].id]);
  assert.deepEqual(addCompareId(added, products[1].id), added);
  assert.deepEqual(removeCompareId(added, products[0].id), [products[1].id]);
  assert.deepEqual(ids, [products[0].id]);
});

test("compare enforces three products and permits replacement after removal", () => {
  const ids = products.slice(0, 3).map((product) => product.id);
  assert.deepEqual(addCompareId(ids, products[3].id), ids);
  assert.deepEqual(addCompareId(removeCompareId(ids, ids[0]), products[3].id), [ids[1], ids[2], products[3].id]);
});

test("saved comparison IDs reject malformed, unknown, duplicate and excess entries", () => {
  assert.deepEqual(parseCompareIds("invalid"), []);
  assert.deepEqual(parseCompareIds("{}"), []);
  assert.deepEqual(addCompareId([], "missing"), []);
  const raw = JSON.stringify([null, "missing", products[0].id, products[0].id, ...products.slice(1, 5).map((product) => product.id)]);
  assert.deepEqual(parseCompareIds(raw), products.slice(0, 3).map((product) => product.id));
});

test("comparison persistence survives store recreation and persists remove/clear", () => {
  const storage = memoryStorage();
  const first = createCompareStore(() => storage);
  first.add(products[0].id);
  first.add(products[1].id);
  first.add(products[1].id);
  const restored = createCompareStore(() => storage);
  assert.deepEqual(JSON.parse(restored.read()), [products[0].id, products[1].id]);
  restored.remove(products[0].id);
  assert.deepEqual(JSON.parse(storage.getItem(compareKey)), [products[1].id]);
  restored.clear();
  assert.deepEqual(JSON.parse(first.read()), []);
});

test("compare store notifies subscribers and reads updates from other tabs", () => {
  const storage = memoryStorage();
  const store = createCompareStore(() => storage);
  let updates = 0;
  const unsubscribe = store.subscribe(() => updates++);
  store.add(products[0].id);
  assert.equal(updates, 1);
  unsubscribe();
  store.remove(products[0].id);
  assert.equal(updates, 1);
  storage.setItem(compareKey, JSON.stringify([products[2].id]));
  assert.deepEqual(JSON.parse(store.read()), [products[2].id]);
});

test("blocked comparison storage falls back to this session without crashing", () => {
  const store = createCompareStore(() => { throw Error("blocked"); });
  assert.equal(store.read(), "[]");
  store.add(products[0].id);
  store.add(products[1].id);
  assert.deepEqual(JSON.parse(store.read()), [products[0].id, products[1].id]);
  store.remove(products[0].id);
  assert.deepEqual(JSON.parse(store.read()), [products[1].id]);
  store.clear();
  assert.equal(store.read(), "[]");
});

test("differences comparison ignores casing and whitespace, but includes missing values", () => {
  assert.equal(hasDifferentValues(["Apple", " apple "]), false);
  assert.equal(hasDifferentValues(["16GB", "32GB"]), true);
  assert.equal(hasDifferentValues(["16GB", "\u2014"]), true);
  assert.equal(hasDifferentValues(["\u2014", "\u2014"]), false);
});
