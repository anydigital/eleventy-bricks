import { test } from "node:test";
import assert from "node:assert";
import { mergeFilter } from "./mergeFilter.js";

// Mock Eleventy config
function createMockConfig() {
  const filters = {};
  return {
    addFilter(name, fn) {
      filters[name] = fn;
    },
    getFilter(name) {
      return filters[name];
    }
  };
}

test("mergeFilter - merges two arrays", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge([1, 2], [3, 4]);
  assert.deepStrictEqual(result, [1, 2, 3, 4]);
});

test("mergeFilter - merges multiple arrays", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge([1, 2], [3, 4], [5, 6]);
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
});

test("mergeFilter - merges two objects", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3, d: 4 });
});

test("mergeFilter - merges objects with override", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
  assert.deepStrictEqual(result, { a: 1, b: 3, c: 4 });
});

test("mergeFilter - merges multiple objects", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge({ a: 1 }, { b: 2 }, { c: 3 });
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3 });
});

test("mergeFilter - handles empty arrays", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge([], [1, 2], [3]);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test("mergeFilter - handles null first argument with arrays", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge(null, [1, 2]);
  assert.deepStrictEqual(result, [1, 2]);
});

test("mergeFilter - handles null first argument with objects", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge(null, { a: 1 });
  assert.deepStrictEqual(result, { a: 1 });
});

test("mergeFilter - array merge with non-array adds as element", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const result = merge([1, 2], 3);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test("mergeFilter - does not modify original arrays", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const original = [1, 2];
  const result = merge(original, [3, 4]);
  
  assert.deepStrictEqual(original, [1, 2]);
  assert.deepStrictEqual(result, [1, 2, 3, 4]);
});

test("mergeFilter - does not modify original objects", () => {
  const config = createMockConfig();
  mergeFilter(config);
  const merge = config.getFilter("merge");
  
  const original = { a: 1 };
  const result = merge(original, { b: 2 });
  
  assert.deepStrictEqual(original, { a: 1 });
  assert.deepStrictEqual(result, { a: 1, b: 2 });
});
