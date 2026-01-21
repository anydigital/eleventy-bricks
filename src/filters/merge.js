/**
 * Merge arrays or objects together
 * 
 * For arrays: concatenates them together
 * For objects: shallow merges them (later values override earlier ones)
 * 
 * @param {Array|Object} first - The first array or object
 * @param {...Array|Object} rest - Additional arrays or objects to merge
 * @returns {Array|Object} The merged result
 */
export function merge(first, ...rest) {
  // If first argument is null or undefined, treat as empty
  if (first === null || first === undefined) {
    first = Array.isArray(rest[0]) ? [] : {};
  }

  // Determine if we're working with arrays or objects
  const isArray = Array.isArray(first);

  if (isArray) {
    // Merge arrays by concatenating
    return rest.reduce((acc, item) => {
      if (Array.isArray(item)) {
        return acc.concat(item);
      }
      // If item is not an array, add it as a single element
      return acc.concat([item]);
    }, [...first]);
  } else if (typeof first === 'object') {
    // Merge objects using spread operator (shallow merge)
    return rest.reduce((acc, item) => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        return { ...acc, ...item };
      }
      return acc;
    }, { ...first });
  }

  // If first is a primitive, return it as-is
  return first;
}

/**
 * merge filter - Merge arrays or objects together
 * 
 * This filter merges arrays or objects, similar to Twig's merge filter.
 * 
 * Usage in templates:
 *   {{ array1 | merge(array2) }}
 *   {{ array1 | merge(array2, array3) }}
 *   {{ obj1 | merge(obj2) }}
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mergeFilter(eleventyConfig) {
  eleventyConfig.addFilter("merge", merge);
}
