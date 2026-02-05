/**
 * attr_set filter - Override an attribute and return the object
 *
 * This filter takes an object, a key, and a value, and returns a new object
 * with the specified attribute set to the given value.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */

/**
 * Core attr_set function - Override an attribute and return a new object
 *
 * @param {Object} obj - The object to modify
 * @param {string} key - The attribute name to set
 * @param {*} value - The value to set for the attribute
 * @returns {Object} A new object with the specified attribute set to the given value
 */
export function attrSet(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}

export function attrSetFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr_set", attrSet);
}
