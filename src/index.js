import {
  mdAutoRawTags,
  mdAutoNl2br,
  mdAutoLinkFavicons,
  transformAutoRaw,
  transformNl2br,
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
} from "./markdown.js";
import { setAttrFilter } from "./filters/attr.js";
import { whereInFilter } from "./filters/where_in.js";
import { mergeFilter, merge } from "./filters/merge.js";
import { removeTagFilter, removeTag } from "./filters/remove_tag.js";
import { ifFilter, iff } from "./filters/if.js";
import { attrConcatFilter, attrConcat } from "./filters/attr_concat.js";
import { fetchFilter } from "./filters/fetch.js";
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
 * @param {boolean} options.mdAutoLinkFavicons - Enable mdAutoLinkFavicons to add favicons to plain text links (default: false)
 * @param {Array<string>} options.filters - Array of filter names to enable: 'attr', 'where_in', 'merge', 'remove_tag', 'if', 'attr_concat', 'fetch' (default: [])
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  const plugins = {
    mdAutoRawTags,
    mdAutoNl2br,
    mdAutoLinkFavicons,
    siteData,
  };

  const filters = {
    attr: setAttrFilter,
    where_in: whereInFilter,
    merge: mergeFilter,
    remove_tag: removeTagFilter,
    if: ifFilter,
    attr_concat: attrConcatFilter,
    fetch: fetchFilter,
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
  mdAutoLinkFavicons,
  setAttrFilter,
  whereInFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  fetchFilter,
  siteData,
};

// Export transform/utility functions for advanced usage
export {
  transformAutoRaw,
  transformNl2br,
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
  merge,
  removeTag,
  iff,
  attrConcat,
};
