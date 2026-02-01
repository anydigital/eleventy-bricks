/**
 * Concatenate values to an attribute array
 *
 * This function takes an object, an attribute name, and values to append.
 * It returns a new object with the attribute as a combined array of unique items.
 *
 * @param {Object} obj - The object to modify
 * @param {string} attr - The attribute name
 * @param {Array|string|*} values - Values to concatenate (array, JSON string array, or single value)
 * @returns {Object} A new object with the combined unique array
 */
export function attrConcat(obj, attr, values) {
  // Get the existing attribute value, default to empty array if not present
  const existingArray = obj?.[attr] || [];

  // Check if existing value is an array, convert if not
  if (!Array.isArray(existingArray)) {
    console.error(`attrConcat: Expected ${attr} to be an array, got ${typeof existingArray}`);
  }

  // Process the values argument
  let valuesToAdd = [];
  if (Array.isArray(values)) {
    valuesToAdd = values;
  } else if (typeof values === "string" && values.length >= 2 && values.at(0) == "[" && values.at(-1) == "]") {
    // Try to parse as JSON array
    try {
      const parsed = JSON.parse(values);
      if (Array.isArray(parsed)) {
        valuesToAdd = parsed;
      } else {
        valuesToAdd = [values];
      }
    } catch {
      // Not valid JSON, treat as single value
      valuesToAdd = [values];
    }
  } else {
    // If it's a single value, wrap it in an array
    valuesToAdd = [values];
  }

  // Combine arrays and remove duplicates using Set
  const combinedArray = [...new Set([...existingArray, ...valuesToAdd])];

  // Return a new object with the combined array
  return {
    ...obj,
    [attr]: combinedArray,
  };
}

/**
 * attr_concat filter - Concatenate values to an attribute array
 *
 * This filter takes an object, an attribute name, and values to append.
 * It returns a new object with the attribute as a combined array of unique items.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function attrConcatFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr_concat", attrConcat);
}
