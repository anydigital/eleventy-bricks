import { describe, it } from 'node:test';
import assert from 'node:assert';
import { whereInFilter } from './where_in.js';

describe('where_in filter', () => {
  let filterFn;

  // Mock eleventyConfig to capture the filter function
  const mockEleventyConfig = {
    addFilter(name, fn) {
      if (name === 'where_in') {
        filterFn = fn;
      }
    }
  };

  // Register the filter
  whereInFilter(mockEleventyConfig);

  it('should filter items by exact attribute match', () => {
    const collection = [
      { data: { category: 'blog' }, title: 'Post 1' },
      { data: { category: 'news' }, title: 'Post 2' },
      { data: { category: 'blog' }, title: 'Post 3' }
    ];

    const result = filterFn(collection, 'category', 'blog');
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, 'Post 1');
    assert.strictEqual(result[1].title, 'Post 3');
  });

  it('should filter items when attribute is an array (includes check)', () => {
    const collection = [
      { data: { tags: ['javascript', 'tutorial'] }, title: 'Post 1' },
      { data: { tags: ['python', 'tutorial'] }, title: 'Post 2' },
      { data: { tags: ['javascript', 'advanced'] }, title: 'Post 3' }
    ];

    const result = filterFn(collection, 'tags', 'javascript');
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].title, 'Post 1');
    assert.strictEqual(result[1].title, 'Post 3');
  });

  it('should return empty array when collection is not an array', () => {
    const result = filterFn(null, 'category', 'blog');
    assert.strictEqual(result.length, 0);
  });

  it('should filter out items without the specified attribute', () => {
    const collection = [
      { data: { category: 'blog' }, title: 'Post 1' },
      { data: {}, title: 'Post 2' },
      { data: { category: 'blog' }, title: 'Post 3' }
    ];

    const result = filterFn(collection, 'category', 'blog');
    assert.strictEqual(result.length, 2);
  });

  it('should work with attribute directly on item (not in data)', () => {
    const collection = [
      { category: 'blog', title: 'Post 1' },
      { category: 'news', title: 'Post 2' },
      { category: 'blog', title: 'Post 3' }
    ];

    const result = filterFn(collection, 'category', 'blog');
    assert.strictEqual(result.length, 2);
  });

  it('should handle mixed data structures', () => {
    const collection = [
      { data: { category: 'blog' }, title: 'Post 1' },
      { category: 'blog', title: 'Post 2' },
      { data: { category: 'news' }, title: 'Post 3' }
    ];

    const result = filterFn(collection, 'category', 'blog');
    assert.strictEqual(result.length, 2);
  });

  it('should handle array that does not include target value', () => {
    const collection = [
      { data: { tags: ['python', 'tutorial'] }, title: 'Post 1' },
      { data: { tags: ['ruby', 'guide'] }, title: 'Post 2' }
    ];

    const result = filterFn(collection, 'tags', 'javascript');
    assert.strictEqual(result.length, 0);
  });

  it('should handle different value types', () => {
    const collection = [
      { data: { priority: 1 }, title: 'Post 1' },
      { data: { priority: 2 }, title: 'Post 2' },
      { data: { priority: 1 }, title: 'Post 3' }
    ];

    const result = filterFn(collection, 'priority', 1);
    assert.strictEqual(result.length, 2);
  });
});

