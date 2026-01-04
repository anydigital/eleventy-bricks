import { bricks } from "./bricks.js";
import { mdAutoRawTags, mdAutoNl2br, transformAutoRaw, transformNl2br } from "./markdown.js";
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
 * @param {boolean} options.mdAutoNl2br - Enable mdAutoNl2br for \n to <br> conversion (default: false)
 * @param {boolean} options.fragments - Enable fragment shortcode (default: false)
 * @param {boolean} options.setAttrFilter - Enable setAttr filter (default: false)
 * @param {boolean} options.byAttrFilter - Enable byAttr filter (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  const plugins = { bricks, mdAutoRawTags, mdAutoNl2br, fragments, setAttrFilter, byAttrFilter };
  Object.entries(options).forEach(([key, enabled]) => enabled && plugins[key]?.(eleventyConfig));
}

// Export individual helpers for granular usage
export { bricks, mdAutoRawTags, mdAutoNl2br, fragments, setAttrFilter, byAttrFilter };

// Export transform functions for advanced usage
export { transformAutoRaw, transformNl2br };
