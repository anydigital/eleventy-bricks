/**
 * CommonJS wrapper for 11ty Bricks Plugin
 * Provides compatibility for projects using require()
 */

// Dynamic import for ES modules
module.exports = async function eleventyBricksPlugin(eleventyConfig) {
  const { default: plugin } = await import('./index.js');
  return plugin(eleventyConfig);
};

// Export individual helpers
module.exports.autoRaw = async function(eleventyConfig) {
  const { autoRaw } = await import('./index.js');
  return autoRaw(eleventyConfig);
};

