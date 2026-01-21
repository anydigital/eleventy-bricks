/**
 * attr filter - Override an attribute and return the object
 *
 * This filter takes an object, a key, and a value, and returns a new object
 * with the specified attribute set to the given value.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function setAttrFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr", function (obj, key, value) {
    return {
      ...obj,
      [key]: value,
    };
  });
}
