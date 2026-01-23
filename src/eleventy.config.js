/* CLI */
import minimist from "minimist";
/* Plugins */
import { RenderPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyBricksPlugin from "@anydigital/eleventy-bricks";
/* Libraries */
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
/* Data */
import yaml from "js-yaml";

/**
 * Eleventy Configuration
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @returns {Object} The Eleventy configuration object
 */
export default function (eleventyConfig) {
  /* CLI support */
  const argv = minimist(process.argv.slice(2));
  const inputDir = argv.input || "src";

  /* Plugins */
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyBricksPlugin, {
    mdAutoNl2br: true,
    mdAutoRawTags: true,
    mdAutoLinkFavicons: true,
    siteData: true,
    filters: ["attr", "where_in", "merge", "remove_tag", "if", "attr_concat"],
  });

  /* Libraries */
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    })
      .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink(),
      })
      .use(markdownItAttrs),
  );

  /* Data */
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  /* Build */
  eleventyConfig.addPassthroughCopy(
    {
      "src/_public": ".",
      ...(inputDir !== "src" && { [`${inputDir}/_public`]: "." }),
    },
    { expand: true }, // This follows/resolves symbolic links
  );

  /* Dev tools */
  // Follow symlinks in Chokidar used by 11ty to watch files
  eleventyConfig.setChokidarConfig({ followSymlinks: true });

  /* Config */
  return {
    dir: {
      input: inputDir,
      includes: "_theme",
    },
  };
}
