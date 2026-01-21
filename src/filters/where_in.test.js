import { describe, it } from "node:test";
import assert from "node:assert";
import { whereIn, whereInFilter } from "./where_in.js";

describe("whereIn (core logic)", () => {
  it("should filter items by exact attribute match", () => {
    const collection = [
      { category: "blog", title: "Post 1" },
      { category: "news", title: "Post 2" },
      { category: "blog", title: "Post 3" },
    ];

    const result = whereIn(collection, "category", "blog");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, "Post 1");
    assert.strictEqual(result[1].title, "Post 3");
  });

  it("should filter items when attribute is an array (includes check)", () => {
    const collection = [
      { tags: ["javascript", "tutorial"], title: "Post 1" },
      { tags: ["python", "tutorial"], title: "Post 2" },
      { tags: ["javascript", "advanced"], title: "Post 3" },
    ];

    const result = whereIn(collection, "tags", "javascript");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, "Post 1");
    assert.strictEqual(result[1].title, "Post 3");
  });

  it("should return empty array when collection is not an array", () => {
    const result = whereIn(null, "category", "blog");
    assert.strictEqual(result.length, 0);
  });

  it("should filter out items without the specified attribute", () => {
    const collection = [
      { category: "blog", title: "Post 1" },
      { title: "Post 2" },
      { category: "blog", title: "Post 3" },
    ];

    const result = whereIn(collection, "category", "blog");
    assert.strictEqual(result.length, 2);
  });

  it("should work with attribute directly on item (not in data)", () => {
    const collection = [
      { category: "blog", title: "Post 1" },
      { category: "news", title: "Post 2" },
      { category: "blog", title: "Post 3" },
    ];

    const result = whereIn(collection, "category", "blog");
    assert.strictEqual(result.length, 2);
  });

  it("should handle array that does not include target value", () => {
    const collection = [
      { tags: ["python", "tutorial"], title: "Post 1" },
      { tags: ["ruby", "guide"], title: "Post 2" },
    ];

    const result = whereIn(collection, "tags", "javascript");
    assert.strictEqual(result.length, 0);
  });

  it("should handle different value types", () => {
    const collection = [
      { priority: 1, title: "Post 1" },
      { priority: 2, title: "Post 2" },
      { priority: 1, title: "Post 3" },
    ];

    const result = whereIn(collection, "priority", 1);
    assert.strictEqual(result.length, 2);
  });

  it("should support nested attribute names with dot notation", () => {
    const collection = [
      { data: { category: "blog" }, title: "Post 1" },
      { data: { category: "news" }, title: "Post 2" },
      { data: { category: "blog" }, title: "Post 3" },
    ];

    const result = whereIn(collection, "data.category", "blog");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, "Post 1");
    assert.strictEqual(result[1].title, "Post 3");
  });

  it("should support nested arrays with dot notation", () => {
    const collection = [
      { data: { tags: ["javascript", "tutorial"] }, title: "Post 1" },
      { data: { tags: ["python", "tutorial"] }, title: "Post 2" },
      { data: { tags: ["javascript", "advanced"] }, title: "Post 3" },
    ];

    const result = whereIn(collection, "data.tags", "javascript");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, "Post 1");
    assert.strictEqual(result[1].title, "Post 3");
  });

  it("should handle deeply nested paths", () => {
    const collection = [
      { data: { meta: { status: "published" } }, title: "Post 1" },
      { data: { meta: { status: "draft" } }, title: "Post 2" },
      { data: { meta: { status: "published" } }, title: "Post 3" },
    ];

    const result = whereIn(collection, "data.meta.status", "published");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, "Post 1");
    assert.strictEqual(result[1].title, "Post 3");
  });

  it("should return empty array when nested path does not exist", () => {
    const collection = [
      { data: { category: "blog" }, title: "Post 1" },
      { title: "Post 2" },
    ];

    const result = whereIn(collection, "data.nonexistent.path", "value");
    assert.strictEqual(result.length, 0);
  });
});

describe("whereInFilter (Eleventy integration)", () => {
  it("should register the filter with eleventyConfig", () => {
    let registeredName;
    let registeredFn;

    const mockEleventyConfig = {
      addFilter(name, fn) {
        registeredName = name;
        registeredFn = fn;
      },
    };

    whereInFilter(mockEleventyConfig);

    assert.strictEqual(registeredName, "where_in");
    assert.strictEqual(typeof registeredFn, "function");
    assert.strictEqual(registeredFn, whereIn);
  });
});
