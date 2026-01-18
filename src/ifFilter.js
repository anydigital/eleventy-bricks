/**
 * if utility function - Ternary/conditional helper
 * 
 * Returns trueValue if condition is truthy, otherwise returns falseValue.
 * Similar to Nunjucks' inline if: `value if condition else other_value`
 * 
 * @param {*} trueValue - The value to return if condition is truthy
 * @param {*} condition - The condition to evaluate
 * @param {*} falseValue - The value to return if condition is falsy (default: empty string)
 * @returns {*} Either trueValue or falseValue based on condition
 */
export function iff(trueValue, condition, falseValue = '') {
  return condition ? trueValue : falseValue;
}

/**
 * if filter - Inline conditional/ternary operator for templates
 * 
 * This filter provides a simple inline if/else similar to Nunjucks.
 * 
 * Usage in Liquid templates:
 *   {{ "Active" | if: isActive, "Inactive" }}
 *   {{ "Yes" | if: condition }}
 *   {{ someValue | if: test, otherValue }}
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function ifFilter(eleventyConfig) {
  eleventyConfig.addFilter("if", iff);
}
