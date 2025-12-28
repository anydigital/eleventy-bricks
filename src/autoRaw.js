/**
 * autoRaw - Forbid Nunjucks processing in Markdown files
 * 
 * This preprocessor wraps Nunjucks syntax ({{, }}, {%, %}) with {% raw %} tags
 * to prevent them from being processed by the template engine in Markdown files.
 * 
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function autoRaw(eleventyConfig) {
  eleventyConfig.addPreprocessor("autoRaw", "md", (data, content) => {
    // This regex looks for {{, }}, {%, or %} individually and wraps them
    return content.replace(/({{|}}|{%|%})/g, "{% raw %}$1{% endraw %}");
  });
}

