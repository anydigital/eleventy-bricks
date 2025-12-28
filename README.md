# 11ty-bricks

A collection of helpful utilities and filters for Eleventy (11ty).

## Installation

```bash
npm install @anydigital/11ty-bricks
```

## Usage

You can use this library in two ways:

### Option 1: As a Plugin (All Helpers)

Import and use the entire plugin to register all helpers at once:

**ES Modules:**
```javascript
import eleventyBricks from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  eleventyBricks(eleventyConfig);
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const eleventyBricks = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  eleventyBricks(eleventyConfig);
  
  // Your other configuration...
};
```

### Option 2: Import Individual Helpers

Import only the helpers you need:

**ES Modules:**
```javascript
import { autoRaw } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  autoRaw(eleventyConfig);
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const { autoRaw } = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  autoRaw(eleventyConfig);
  
  // Your other configuration...
};
```

## Available Helpers

### autoRaw

Prevents Nunjucks syntax from being processed in Markdown files by automatically wrapping `{{`, `}}`, `{%`, and `%}` with `{% raw %}` tags.

**Why use this?**

When writing documentation or tutorials about templating in Markdown files, you often want to show Nunjucks/Liquid syntax as literal text. This helper automatically escapes these special characters so they display as-is instead of being processed by the template engine.

**Example:**

Before `autoRaw`, writing this in Markdown:
```markdown
Use {{ variable }} to output variables.
```

Would try to process `{{ variable }}` as a template variable. With `autoRaw`, it displays exactly as written.

## Requirements

- Node.js >= 18.0.0
- Eleventy >= 2.0.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
