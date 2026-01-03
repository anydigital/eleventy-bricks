import { readFileSync } from "fs";
import { join } from "path";

/**
 * fragment shortcode - Include content from fragments
 * 
 * This shortcode reads a file from the _fragments directory and includes
 * its content. The content will be processed by the template engine.
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function fragment(eleventyConfig) {
  eleventyConfig.addShortcode("fragment", function(path) {
    // Get the input directory from Eleventy's context
    const inputDir = this.page?.inputPath 
      ? join(process.cwd(), eleventyConfig.dir?.input || ".") 
      : process.cwd();
    
    // Construct the full path to the fragment file
    const fragmentPath = join(inputDir, "_fragments", path);
    
    try {
      // Read the fragment file
      const content = readFileSync(fragmentPath, "utf8");
      
      // Return content to be processed by the template engine
      return content;
    } catch (error) {
      console.error(`Error reading fragment at ${fragmentPath}:`, error.message);
      return `<!-- Fragment not found: ${path} -->`;
    }
  });
}

