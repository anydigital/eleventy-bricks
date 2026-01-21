/**
 * where_in filter - Filter collection items by attribute value
 *
 * This filter takes a collection, an attribute name, and a target value,
 * and returns items where the attribute matches the target value.
 * If the attribute is an array, it checks if the array includes the target value.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function whereInFilter(eleventyConfig) {
  eleventyConfig.addFilter(
    "where_in",
    function (collection, attrName, targetValue) {
      if (!collection || !Array.isArray(collection)) {
        return [];
      }

      return collection.filter((item) => {
        // Get the attribute value from the item
        const attrValue = item?.[attrName];

        // If attribute doesn't exist, skip this item
        if (attrValue === undefined || attrValue === null) {
          return false;
        }

        // If the attribute is an array, check if it includes the target value
        if (Array.isArray(attrValue)) {
          return attrValue.includes(targetValue);
        }

        // Otherwise, do a direct comparison
        return attrValue === targetValue;
      });
    }
  );
}
