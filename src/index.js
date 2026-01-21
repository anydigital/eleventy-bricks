import { bricks } from "./bricks.js";
import {
  mdAutoRawTags,
  mdAutoNl2br,
  transformAutoRaw,
  transformNl2br,
} from "./markdown.js";
import { setAttrFilter } from "./setAttrFilter.js";
import { byAttrFilter } from "./byAttrFilter.js";
import { mergeFilter, merge } from "./mergeFilter.js";
import { removeTagFilter, removeTag } from "./removeTagFilter.js";
import { ifFilter, iff } from "./ifFilter.js";
import { attrConcatFilter, attrConcat } from "./attrConcatFilter.js";
import { siteData } from "./siteData.js";

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
 * @param {boolean} options.setAttrFilter - Enable setAttr filter (default: false)
 * @param {boolean} options.byAttrFilter - Enable byAttr filter (default: false)
 * @param {boolean} options.mergeFilter - Enable merge filter (default: false)
 * @param {boolean} options.removeTagFilter - Enable removeTag filter (default: false)
 * @param {boolean} options.ifFilter - Enable if filter (default: false)
 * @param {boolean} options.attr_concat_filter - Enable attr_concat filter (default: false)
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  const plugins = {
    bricks,
    mdAutoRawTags,
    mdAutoNl2br,
    setAttrFilter,
    byAttrFilter,
    mergeFilter,
    removeTagFilter,
    ifFilter,
    attr_concat_filter: attrConcatFilter,
    siteData,
  };
  Object.entries(options).forEach(
    ([key, enabled]) => enabled && plugins[key]?.(eleventyConfig)
  );
}

// Export individual helpers for granular usage
export {
  bricks,
  mdAutoRawTags,
  mdAutoNl2br,
  setAttrFilter,
  byAttrFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  siteData,
};

// Export transform/utility functions for advanced usage
export { transformAutoRaw, transformNl2br, merge, removeTag, iff, attrConcat };
