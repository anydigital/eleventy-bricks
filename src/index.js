import {
  mdAutoRawTags,
  mdAutoNl2br,
  transformAutoRaw,
  transformNl2br,
} from "./markdown.js";
import { setAttrFilter } from "./filters/set_attr.js";
import { byAttrFilter } from "./filters/by_attr.js";
import { mergeFilter, merge } from "./filters/merge.js";
import { removeTagFilter, removeTag } from "./filters/remove_tag.js";
import { ifFilter, iff } from "./filters/if.js";
import { attrConcatFilter, attrConcat } from "./filters/attr_concat.js";
import { siteData } from "./siteData.js";

/**
 * 11ty Bricks Plugin
 *
 * A collection of helpful utilities and filters for Eleventy (11ty).
 * Can be used as a plugin or by importing individual helpers.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @param {Object} options - Plugin options
 * @param {boolean} options.mdAutoRawTags - Enable mdAutoRawTags preprocessor (default: false)
 * @param {boolean} options.mdAutoNl2br - Enable mdAutoNl2br for \n to <br> conversion (default: false)
 * @param {Array<string>} options.filters - Array of filter names to enable: 'set_attr', 'by_attr', 'merge', 'remove_tag', 'if', 'attr_concat' (default: [])
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  const plugins = {
    mdAutoRawTags,
    mdAutoNl2br,
    siteData,
  };

  const filters = {
    set_attr: setAttrFilter,
    by_attr: byAttrFilter,
    merge: mergeFilter,
    remove_tag: removeTagFilter,
    if: ifFilter,
    attr_concat: attrConcatFilter,
  };

  // Handle individual plugin options
  Object.entries(options).forEach(([key, enabled]) => {
    if (key !== "filters" && enabled && plugins[key]) {
      plugins[key](eleventyConfig);
    }
  });

  // Handle filters array
  if (Array.isArray(options.filters)) {
    options.filters.forEach((filterName) => {
      if (filters[filterName]) {
        filters[filterName](eleventyConfig);
      }
    });
  }
}

// Export individual helpers for granular usage
export {
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
