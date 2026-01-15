import { test } from 'node:test';
import assert from 'node:assert';
import { merge } from './mergeFilter.js';

test('merge - merges two arrays', () => {
  const result = merge([1, 2], [3, 4]);
  assert.deepStrictEqual(result, [1, 2, 3, 4]);
});

test('merge - merges multiple arrays', () => {
  const result = merge([1, 2], [3, 4], [5, 6]);
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
});

test('merge - merges two objects', () => {
  const result = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3, d: 4 });
});

test('merge - merges objects with override', () => {
  const result = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
  assert.deepStrictEqual(result, { a: 1, b: 3, c: 4 });
});

test('merge - merges multiple objects', () => {
  const result = merge({ a: 1 }, { b: 2 }, { c: 3 });
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3 });
});

test('merge - handles empty arrays', () => {
  const result = merge([], [1, 2], [3]);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test('merge - handles null first argument with arrays', () => {
  const result = merge(null, [1, 2]);
  assert.deepStrictEqual(result, [1, 2]);
});

test('merge - handles null first argument with objects', () => {
  const result = merge(null, { a: 1 });
  assert.deepStrictEqual(result, { a: 1 });
});

test('merge - array merge with non-array adds as element', () => {
  const result = merge([1, 2], 3);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test('merge - does not modify original arrays', () => {
  const original = [1, 2];
  const result = merge(original, [3, 4]);
  
  assert.deepStrictEqual(original, [1, 2]);
  assert.deepStrictEqual(result, [1, 2, 3, 4]);
});

test('merge - does not modify original objects', () => {
  const original = { a: 1 };
  const result = merge(original, { b: 2 });
  
  assert.deepStrictEqual(original, { a: 1 });
  assert.deepStrictEqual(result, { a: 1, b: 2 });
});
