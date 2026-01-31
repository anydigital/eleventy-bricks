import lodash from "@11ty/lodash-custom";
const { get } = lodash;

/**
 * Core logic for filtering collection items by attribute value
 *
 * This function takes a collection, an attribute name, and a target value,
 * and returns items where the attribute matches the target value.
 * If the attribute is an array, it checks if the array includes the target value.
 *
 * Supports nested attribute names using dot notation (e.g., "data.tags").
 *
 * @param {Array} collection - The collection to filter
 * @param {string} attrName - The attribute name to check (supports dot notation for nested properties)
 * @param {*} targetValue - The value to match against
 * @returns {Array} Filtered collection
 */
export function whereIn(collection, attrName, targetValue) {
  // If no targetValue, return original collection
  if (!targetValue) {
    return collection;
  }

  return collection.filter((item) => {
    // Get the attribute value from the item (supports nested paths like "data.tags")
    const attrValue = get(item, attrName);

    // If the attribute is an array, check if it includes the target value
    if (Array.isArray(attrValue)) {
      return attrValue.includes(targetValue);
    }

    // Otherwise skip this item
    return false;
  });
}

/**
 * Registers the where_in filter with Eleventy
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function whereInFilter(eleventyConfig) {
  eleventyConfig.addFilter("where_in", whereIn);
}
