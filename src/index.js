import { bricksRegistry } from "./bricksRegistry.js";
import { autoRaw } from "./autoRaw.js";

/**
 * 11ty Bricks Plugin
 * 
 * A collection of helpful utilities and filters for Eleventy (11ty).
 * Can be used as a plugin or by importing individual helpers.
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @param {Object} options - Plugin options
 * @param {boolean} options.bricksRegistry - Enable bricksRegistry (default: false)
 * @param {boolean} options.autoRaw - Enable autoRaw preprocessor (default: false)
 */
export default function eleventyBricksPlugin(eleventyConfig, options = {}) {
  if (options.bricksRegistry) {
    bricksRegistry(eleventyConfig);
  }
  if (options.autoRaw) {
    autoRaw(eleventyConfig);
  }
}

// Export individual helpers for granular usage
export { bricksRegistry };
export { autoRaw };
