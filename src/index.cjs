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
module.exports.bricks = async function(eleventyConfig) {
  const { bricks } = await import('./index.js');
  return bricks(eleventyConfig);
};
module.exports.mdAutoRawTags = async function(eleventyConfig) {
  const { mdAutoRawTags } = await import('./index.js');
  return mdAutoRawTags(eleventyConfig);
};
module.exports.fragment = async function(eleventyConfig) {
  const { fragments } = await import('./index.js');
  return fragments(eleventyConfig);
};
module.exports.setAttr = async function(eleventyConfig) {
  const { setAttrFilter } = await import('./index.js');
  return setAttrFilter(eleventyConfig);
};
module.exports.byAttr = async function(eleventyConfig) {
  const { byAttrFilter } = await import('./index.js');
  return byAttrFilter(eleventyConfig);
};
