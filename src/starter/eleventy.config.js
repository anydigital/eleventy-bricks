/* Plugins */
import { RenderPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyBricksPlugin from "@anydigital/11ty-bricks";
/* Libraries */
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
/* Data */
import yaml from "js-yaml";


export default function(eleventyConfig) {
  const inputDir = eleventyConfig.dir?.input || "src";console.log(eleventyConfig.dir);

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
    "_public": ".", 
    [`${inputDir}/_public`]: "." 
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
