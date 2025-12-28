import { autoRaw } from "./autoRaw.js";

/**
 * 11ty Bricks Plugin
 * 
 * A collection of helpful utilities and filters for Eleventy (11ty).
 * Can be used as a plugin or by importing individual helpers.
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export default function eleventyBricksPlugin(eleventyConfig) {
  // Register all helpers
  autoRaw(eleventyConfig);
}

// Export individual helpers for granular usage
export { autoRaw };

