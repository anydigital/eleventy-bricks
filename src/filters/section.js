/**
 * Extract a named section from content marked with HTML comments
 *
 * @param {string} content - The content to process
 * @param {string} sectionName - The section name(s) to extract
 * @returns {string} The extracted section content
 */
export function section(content, sectionName) {
  if (!content || typeof content !== "string") {
    return content;
  }

  if (typeof sectionName !== "string" || !sectionName) {
    return "";
  }

  // Normalize section name for comparison (trim whitespace)
  const targetName = sectionName.trim().toLowerCase();

  // Regex to match section markers with content up to the next section or end of string
  // Captures: (1) section names, (2) content until next section marker or end
  const sectionRegex = /<!--section:([^>]+)-->([\s\S]*?)(?=<!--section|$)/g;

  let results = [];
  let match;

  // Find all sections
  while ((match = sectionRegex.exec(content)) !== null) {
    const namesStr = match[1];
    const sectionContent = match[2];
    const names = namesStr.split(",").map((n) => n.trim().toLowerCase());

    // Check if any of the names match the target
    if (names.includes(targetName)) {
      results.push(sectionContent);
    }
  }

  // Join all matching sections
  return results.join("");
}

/**
 * section filter - Extract a named section from content
 *
 * Usage in templates:
 *   {{ content | section('intro') }}
 *   {{ content | section('footer') }}
 *
 * Content format:
 *   <!--section:intro-->
 *   This is the intro content
 *   <!--section:main-->
 *   This is the main content
 *   <!--section:footer,sidebar-->
 *   This appears in both footer and sidebar sections
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function sectionFilter(eleventyConfig) {
  eleventyConfig.addFilter("section", section);
}
