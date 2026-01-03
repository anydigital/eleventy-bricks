/**
 * CommonJS wrapper for 11ty Bricks Plugin
 * Provides compatibility for projects using require()
 */

// Dynamic import for ES modules
module.exports = async function eleventyBricksPlugin(eleventyConfig, options) {
  const { default: plugin } = await import('./index.js');
  return plugin(eleventyConfig, options);
};

// Export individual helpers
module.exports.bricksRegistry = async function(eleventyConfig) {
  const { bricksRegistry } = await import('./index.js');
  return bricksRegistry(eleventyConfig);
};
module.exports.autoRaw = async function(eleventyConfig) {
  const { autoRaw } = await import('./index.js');
  return autoRaw(eleventyConfig);
};
module.exports.fragment = async function(eleventyConfig) {
  const { fragment } = await import('./index.js');
  return fragment(eleventyConfig);
};
