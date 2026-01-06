/**
 * Add site.year and site.isProd global data
 * - site.isProd: Boolean indicating if running in production mode (build) vs development (serve)
 * - site.year: Sets the current year to be available in all templates as {{ site.year }}
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function siteData(eleventyConfig) {
  eleventyConfig.addGlobalData("site.isProd", () => process.env.ELEVENTY_RUN_MODE === "build");
  eleventyConfig.addGlobalData("site.year", () => new Date().getFullYear());
}

