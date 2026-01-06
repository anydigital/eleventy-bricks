/**
 * Add site.year global data
 * Sets the current year to be available in all templates as {{ site.year }}
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function siteData(eleventyConfig) {
  eleventyConfig.addGlobalData("site.year", () => new Date().getFullYear());
}

