/**
 * Transform Nunjucks syntax in content by wrapping it with raw tags
 *
 * This function wraps Nunjucks syntax ({{, }}, {%, %}) with {% raw %} tags
 * to prevent them from being processed by the template engine.
 *
 * @param {string} content - The content to transform
 * @returns {string} The transformed content with Nunjucks syntax wrapped
 */
export function transformAutoRaw(content) {
  // This regex looks for {{, }}, {%, or %} individually and wraps them
  return content.replace(/({{|}}|{%|%})/g, "{% raw %}$1{% endraw %}");
}

/**
 * mdAutoRawTags - Forbid Nunjucks processing in Markdown files
 *
 * This preprocessor wraps Nunjucks syntax ({{, }}, {%, %}) with {% raw %} tags
 * to prevent them from being processed by the template engine in Markdown files.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mdAutoRawTags(eleventyConfig) {
  eleventyConfig.addPreprocessor("mdAutoRawTags", "md", (data, content) => {
    return transformAutoRaw(content);
  });
}

/**
 * Transform \n sequences to <br> tags
 *
 * This function converts literal \n sequences (double backslash + n) to HTML <br> tags.
 * It handles both double \n\n and single \n sequences, processing double ones first.
 *
 * @param {string} content - The content to transform
 * @returns {string} The transformed content with \n converted to <br>
 */
export function transformNl2br(content) {
  // Replace double \n\n first, then single \n to avoid double conversion
  return content.replace(/\\n\\n/g, "<br>").replace(/\\n/g, "<br>");
}

/**
 * mdAutoNl2br - Auto convert \\n to <br> in markdown (especially tables)
 *
 * This function amends the markdown library to automatically convert \\n
 * to <br> tags in text content, which is particularly useful for line breaks
 * inside markdown tables where standard newlines don't work.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mdAutoNl2br(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.renderer.rules.text = (tokens, idx) => {
      return transformNl2br(tokens[idx].content);
    };
  });
}
