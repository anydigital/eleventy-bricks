/**
 * CommonJS wrapper for 11ty Bricks Plugin
 * Provides compatibility for projects using require()
 */

// Dynamic import for ES modules
module.exports = async function eleventyBricksPlugin(eleventyConfig, options) {
  const { default: plugin } = await import("./index.js");
  return plugin(eleventyConfig, options);
};

// Export individual helpers for granular usage
[
  "mdAutoRawTags",
  "mdAutoNl2br",
  "attrSetFilter",
  "attrIncludesFilter",
  "mergeFilter",
  "removeTagFilter",
  "ifFilter",
  "attrConcatFilter",
  "siteData",
].forEach((name) => {
  module.exports[name] = async (eleventyConfig) => {
    const module = await import("./index.js");
    return module[name](eleventyConfig);
  };
});

// Export transform/utility functions for advanced usage
["transformAutoRaw", "transformNl2br", "merge", "removeTag", "iff", "attrConcat", "attrSet"].forEach((name) => {
  module.exports[name] = async (...args) => {
    const module = await import("./index.js");
    return module[name](...args);
  };
});
