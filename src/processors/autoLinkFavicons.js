/**
 * Check if link text looks like a plain URL or domain
 *
 * @param {string} linkText - The text content of the link
 * @param {string} domain - The domain extracted from the URL
 * @returns {boolean} True if the link text appears to be a plain URL
 */
export function isPlainUrlText(linkText, domain) {
  return linkText.trim().includes(domain) || linkText.trim().match(/^https?:\/\//) !== null;
}

/**
 * Clean link text by removing protocol, domain, and leading slash
 *
 * @param {string} linkText - The original link text
 * @param {string} domain - The domain to remove
 * @returns {string} The cleaned text
 */
export function cleanLinkText(linkText, domain) {
  const cleanedText = linkText
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const withoutDomain = cleanedText.replace(domain, "");
  return withoutDomain.length > 2 ? withoutDomain : cleanedText;
}

/**
 * Build HTML for a link with favicon
 *
 * @param {string} attrs - The link attributes (including href)
 * @param {string} domain - The domain for the favicon
 * @param {string} text - The text to display
 * @returns {string} The HTML string
 */
export function buildFaviconLink(attrs, domain, text) {
  let updatedAttrs = attrs;

  // Check if attrs already contains a class attribute
  if (/class\s*=\s*["']/.test(attrs)) {
    // Append whitespace-nowrap to existing class
    updatedAttrs = attrs.replace(/class\s*=\s*["']([^"']*)["']/i, 'class="$1 whitespace-nowrap"');
  } else {
    // Add new class attribute
    updatedAttrs = attrs + ' class="whitespace-nowrap"';
  }

  // Check if attrs already contains a target attribute
  if (!/target\s*=/.test(attrs)) {
    updatedAttrs = updatedAttrs + ' target="_blank"';
  }

  return `<a ${updatedAttrs}><i><img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64"></i><span>${text}</span></a>`;
}

/**
 * Transform a single link to include a favicon
 *
 * @param {string} match - The full matched link HTML
 * @param {string} attrs - The link attributes
 * @param {string} url - The URL from the href attribute
 * @param {string} linkText - The text content of the link
 * @returns {string} The transformed link or original match if not applicable
 */
export function transformLink(match, attrs, url, linkText) {
  try {
    // Extract domain from URL
    const urlObj = new URL(url, "http://dummy.com");
    const domain = urlObj.hostname;

    // Only add favicon if link text looks like a plain URL/domain
    if (isPlainUrlText(linkText, domain)) {
      const cleanedText = cleanLinkText(linkText, domain);
      return buildFaviconLink(attrs, domain, cleanedText);
    }
    return match; // @TODO: throw?
  } catch (e) {
    // If URL parsing fails, return original match
    return match;
  }
}

/**
 * Replace all anchor links in HTML content with transformed versions
 *
 * This function searches for all anchor tags in HTML content and replaces them
 * using the provided transform function. The regex captures:
 * - Group 1: All attributes including href
 * - Group 2: The URL from the href attribute
 * - Group 3: The link text content
 *
 * @param {string} content - The HTML content to process
 * @param {Function} transformer - Function to transform each link (receives match, attrs, url, linkText)
 * @returns {string} The HTML content with transformed links
 */
export function replaceLinksInHtml(content, transformer) {
  return content.replace(/<a\s+([^>]*href=["']([^"']+)["'][^>]*)>([^<]+)<\/a>/gi, transformer);
}

/**
 * autoLinkFavicons - Add favicon images to plain text links
 *
 * This transform automatically adds favicon images from Google's favicon service
 * to links that display plain URLs or domain names. It processes all HTML output
 * files and adds inline favicon images next to the link text.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function autoLinkFavicons(eleventyConfig) {
  eleventyConfig.addTransform("autoLinkFavicons", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return replaceLinksInHtml(content, transformLink);
    }
    return content;
  });
}
