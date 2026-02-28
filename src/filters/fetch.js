import EleventyFetch from "@11ty/eleventy-fetch";
import path from "path";
import fs from "fs/promises";

/**
 * fetch filter - Fetch a URL or local file and return its raw content
 *
 * This filter takes a URL or local file path. For URLs, it downloads them
 * using eleventy-fetch to the input directory's _downloads folder.
 * For local paths, it reads them relative to the input directory.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function fetchFilter(eleventyConfig) {
  eleventyConfig.addFilter("fetch", async function (url) {
    if (!url) {
      throw new Error("fetch filter requires a URL or path");
    }

    // Get the input directory from Eleventy config
    const inputDir = this.eleventy.directories.input;

    // Check if it's a URL or local path
    const isUrl = url.startsWith("http://") || url.startsWith("https://");

    try {
      if (isUrl) {
        // Handle remote URLs with eleventy-fetch
        const cacheDirectory = path.join(inputDir, "_downloads");
        const content = await EleventyFetch(url, {
          duration: "1d", // Cache for 1 day by default
          type: "text", // Return as text
          directory: cacheDirectory,
        });
        return content;
      } else {
        // Handle local file paths relative to input directory
        const filePath = path.join(inputDir, url);
        const content = await fs.readFile(filePath, "utf-8");
        return content;
      }
    } catch (error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
  });
}
