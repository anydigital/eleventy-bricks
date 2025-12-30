# 11ty-bricks

A collection of helpful utilities and filters for Eleventy (11ty).

## Installation

```bash
npm install @anydigital/11ty-bricks
```

## Usage

You can use this library in two ways:

### Option 1: As a Plugin

Import and use the entire plugin. You can configure which helpers to enable using the options parameter:

**ES Modules:**
```javascript
import eleventyBricks from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBricks, {
    autoRaw: true  // Enable autoRaw preprocessor (default: false)
  });
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const eleventyBricks = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBricks, {
    autoRaw: true  // Enable autoRaw preprocessor (default: false)
  });
  
  // Your other configuration...
};
```

### Option 2: Import Individual Helpers (Recommended)

Import only the specific helpers you need without using the plugin:

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

## Configuration Options

When using the plugin (Option 1), you can configure which helpers to enable:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoRaw` | boolean | `false` | Enable the autoRaw preprocessor for Markdown files |

**Example:**
```javascript
eleventyConfig.addPlugin(eleventyBricks, {
  autoRaw: true
});
```

## Available 11ty Helpers

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

## Available Bricks (Components)

### Navigation Macro (`_nav.njk`)

A reusable Nunjucks macro for rendering navigation menus with proper accessibility attributes. This macro works seamlessly with the [11ty Navigation Plugin](https://www.11ty.dev/docs/plugins/navigation/).

**Usage:**

1. Import the macro in your template:

```njk
{% from "bricks/_nav.njk" import render as renderNav %}
```

2. Call the macro with your navigation data:

```njk
{{ renderNav(collections.all | eleventyNavigation, page) }}
```

**Parameters:**

- `navPages`: Array of navigation entries (typically from `eleventyNavigation` filter)
- `curPage`: Current page object (use Eleventy's `page` variable)

**Features:**

- Renders a semantic `<nav>` element
- Automatically adds `aria-current="page"` to the current page link for accessibility
- Clean, minimal markup ready for styling
- Works with nested navigation structures from the 11ty Navigation Plugin

**Example Output:**

```html
<nav>
  <a href="/">Home</a>
  <a href="/about/">About</a>
  <a href="/contact/" aria-current="page">Contact</a>
</nav>
```

### Google Tag Manager Macro (`_gtm.njk`)

A reusable Nunjucks macro for integrating Google Tag Manager (GTM) into your site. Provides separate macros for the head and body GTM snippets.

**Usage:**

1. Import the macros in your base template:

```njk
{% import 'bricks/_gtm.njk' as gtm %}
```

2. Call the macros in the appropriate locations:

```njk
<head>
  <!-- Other head content -->
  {{ gtm.renderHead('GTM-XXXXXXX') }}
</head>
<body>
  {{ gtm.renderBody('GTM-XXXXXXX') }}
  <!-- Rest of body content -->
</body>
```

**Parameters:**

Both macros accept the same parameter:
- `gtmId`: Your Google Tag Manager container ID (e.g., `'GTM-XXXXXXX'`)

**Features:**

- Separate macros for head and body placement as recommended by Google
- Clean, standard GTM implementation
- Easy to maintain and update across your site
- Works with all GTM features including noscript fallback

## CLI Helper Commands

After installing this package, the `download-files` command becomes available:

### download-files

A CLI command that downloads external files to your project based on URLs specified in your `package.json`.

**Usage:**

1. Add a `_downloadFiles` field to your project's `package.json` with URL-to-path mappings:

```json
{
  "_downloadFiles": {
    "https://example.com/library.js": "src/vendor/library.js",
    "https://cdn.example.com/styles.css": "public/css/external.css"
  }
}
```

2. Run the download command:

```bash
npx download-files
```

**Options:**

- `-o, --output <dir>`: Specify an output directory where all files will be downloaded (relative paths in `_downloadFiles` will be resolved relative to this directory)

```bash
# Download all files to a specific directory
npx download-files --output public
```

**Features:**

- Downloads multiple files from external URLs
- Automatically creates directories if they don't exist
- Overwrites existing files
- Continues downloading remaining files even if some fail
- Provides clear progress and error messages
- Returns appropriate exit codes for CI/CD integration

**Use Cases:**

- Download third-party libraries and assets
- Fetch external resources during build processes
- Keep vendored files up to date
- Automate dependency downloads that aren't available via npm

## Requirements

- Node.js >= 18.0.0
- Eleventy >= 2.0.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
