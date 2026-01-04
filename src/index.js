import { bricksRegistry } from "./bricksRegistry.js";
import { autoRaw } from "./autoRaw.js";
import { fragment } from "./fragment.js";
import { setAttrFilter } from "./setAttrFilter.js";
import { byAttrFilter } from "./byAttrFilter.js";

/**
 * 11ty Bricks Plugin
 * 
 * A collection of helpful utilities and filters for Eleventy (11ty).
 * Can be used as a plugin or by importing individual helpers.
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @param {Object} options - Plugin options
 * @param {boolean} options.bricks - Enable bricks system with dependencies injection (default: false)
 * @param {boolean} options.autoRawPreprocessor - Enable autoRaw preprocessor (default: false)
 * @param {boolean} options.fragments - Enable fragment shortcode (default: false)
 * @param {boolean} options.setAttrFilter - Enable setAttr filter (default: false)
 * @param {boolean} options.byAttrFilter - Enable byAttr filter (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  if (options.bricks) {
    bricksRegistry(eleventyConfig);
  }
  if (options.autoRawPreprocessor) {
    autoRaw(eleventyConfig);
  }
  if (options.fragments) {
    fragment(eleventyConfig);
  }
  if (options.setAttrFilter) {
    setAttrFilter(eleventyConfig);
  }
  if (options.byAttrFilter) {
    byAttrFilter(eleventyConfig);
  }
}

// Export individual helpers for granular usage
export { bricksRegistry };
export { autoRaw };
export { fragment };
export { setAttrFilter };
export { byAttrFilter };
