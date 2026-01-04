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

