/**
 * Strip a specified HTML element from provided HTML, keeping its inner content
 *
 * @param {string} html - The HTML content to process
 * @param {string} tagName - The tag name to strip (opening/closing tags removed, inner content kept)
 * @returns {string} The HTML with the specified tag stripped but its inner content preserved
 */
export function stripTag(html, tagName) {
  if (!html || typeof html !== "string") {
    return html;
  }

  if (typeof tagName !== "string" || !tagName) {
    return html;
  }

  // Escape special regex characters in tag name
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Remove opening tags (with optional attributes): <tag> or <tag attr="val">
  const openingRegex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>`, "gi");
  let result = html.replace(openingRegex, "");

  // Remove closing tags: </tag>
  const closingRegex = new RegExp(`<\\/${escapedTag}>`, "gi");
  result = result.replace(closingRegex, "");

  return result;
}

/**
 * strip_tag filter - Strip a specified HTML element, keeping its inner content
 *
 * Usage in templates:
 *   {{ htmlContent | strip_tag('div') }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function stripTagFilter(eleventyConfig) {
  eleventyConfig.addFilter("strip_tag", stripTag);
}
