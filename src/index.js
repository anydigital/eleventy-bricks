import { bricks } from "./bricks.js";
import { mdAutoRawTags } from "./markdown.js";
import { fragments } from "./fragments.js";
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
 * @param {boolean} options.mdAutoRawTags - Enable mdAutoRawTags preprocessor (default: false)
 * @param {boolean} options.fragments - Enable fragment shortcode (default: false)
 * @param {boolean} options.setAttrFilter - Enable setAttr filter (default: false)
 * @param {boolean} options.byAttrFilter - Enable byAttr filter (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  if (options.bricks) {
    bricks(eleventyConfig);
  }
  if (options.mdAutoRawTags) {
    mdAutoRawTags(eleventyConfig);
  }
  if (options.fragments) {
    fragments(eleventyConfig);
  }
  if (options.setAttrFilter) {
    setAttrFilter(eleventyConfig);
  }
  if (options.byAttrFilter) {
    byAttrFilter(eleventyConfig);
  }
}

// Export individual helpers for granular usage
export { bricks };
export { mdAutoRawTags };
export { fragments };
export { setAttrFilter };
export { byAttrFilter };
