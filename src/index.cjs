/**
 * CommonJS wrapper for 11ty Bricks Plugin
 * Provides compatibility for projects using require()
 */

// Dynamic import for ES modules
module.exports = async function eleventyBricksPlugin(eleventyConfig, options) {
  const { default: plugin } = await import('./index.js');
  return plugin(eleventyConfig, options);
};

// Export individual helpers for granular usage
['bricks', 'mdAutoRawTags', 'fragments', 'setAttrFilter', 'byAttrFilter'].forEach(name => {
  module.exports[name] = async (eleventyConfig) => {
    const module = await import('./index.js');
    return module[name](eleventyConfig);
  };
});
