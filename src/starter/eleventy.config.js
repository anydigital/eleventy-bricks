/* CLI */
import minimist from "minimist";
/* Plugins */
import { RenderPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyBricksPlugin from "@anydigital/11ty-bricks";
/* Libraries */
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
/* Data */
import yaml from "js-yaml";

/**
 * Eleventy Configuration
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @returns {Object} The Eleventy configuration object
 */
export default function(eleventyConfig) {
  /* CLI support */
  const argv = minimist(process.argv.slice(2));
  const inputDir = argv.input || "src";

  /* Plugins */
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyBricksPlugin, {
    bricks: true,
    fragments: true,
    mdAutoNl2br: true,
    mdAutoRawTags: true,
    setAttrFilter: true,
    byAttrFilter: true,
    siteData: true
  });

  /* Libraries */
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink()
  }));

  /* Data */
  eleventyConfig.addDataExtension("yml", (contents) => yaml.safeLoad(contents));

  /* Build */
  eleventyConfig.addPassthroughCopy({ 
    "src/_public": ".",
    ...(inputDir !== "src" && { [`${inputDir}/_public`]: "." })
  }, { expand: true }); // This follows/resolves symbolic links

  /* Dev tools */
  // Follow symlinks in Chokidar used by 11ty to watch files
  eleventyConfig.setChokidarConfig({ followSymlinks: true });

  /* Config */
  return {
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    dir: {
      input: inputDir,
      includes: "_template"
    }
  };
};
