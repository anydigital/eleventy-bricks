/**
 * Remove specified HTML element from provided HTML
 * 
 * @param {string} html - The HTML content to process
 * @param {string} tagName - The tag name to remove
 * @returns {string} The HTML with the specified tag removed
 */
export function removeTag(html, tagName) {
  if (!html || typeof html !== 'string') {
    return html;
  }

  if (typeof tagName !== 'string' || !tagName) {
    return html;
  }
  
  // Escape special regex characters in tag name
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Remove opening and closing tags along with their content
  // This regex matches: <tag attributes>content</tag>
  const regex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>.*?<\\/${escapedTag}>`, 'gis');
  let result = html.replace(regex, '');
  
  // Also remove self-closing tags: <tag />
  const selfClosingRegex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?\\s*\\/?>`, 'gi');
  result = result.replace(selfClosingRegex, '');

  return result;
}

/**
 * removeTag filter - Remove specified HTML element from provided HTML
 * 
 * Usage in templates:
 *   {{ htmlContent | removeTag('script') }}
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function removeTagFilter(eleventyConfig) {
  eleventyConfig.addFilter("removeTag", removeTag);
}
