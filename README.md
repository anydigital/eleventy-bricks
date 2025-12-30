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
import { bricksRegistry, autoRaw } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  bricksRegistry(eleventyConfig);
  autoRaw(eleventyConfig);
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const { bricksRegistry, autoRaw } = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  bricksRegistry(eleventyConfig);
  autoRaw(eleventyConfig);
  
  // Your other configuration...
};
```

## Configuration Options

When using the plugin (Option 1), you can configure which helpers to enable:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `bricksRegistry` | boolean | `false` | Enable the bricksRegistry system for dependency management |
| `autoRaw` | boolean | `false` | Enable the autoRaw preprocessor for Markdown files |

**Example:**
```javascript
eleventyConfig.addPlugin(eleventyBricks, {
  bricksRegistry: true,
  autoRaw: true
});
```

## Available 11ty Helpers

### bricksRegistry

A dependency management system for Eleventy that automatically collects and injects CSS and JavaScript dependencies (both external and inline) per page. This allows brick components to declare their dependencies, and the system will inject them in the correct location in your HTML.

**Why use this?**

When building reusable components (bricks) in Eleventy, you often need to include CSS and JavaScript dependencies. Instead of manually adding these to every page, `bricksRegistry` automatically:
- Collects dependencies from all bricks used on a page
- Categorizes them (external CSS, external JS, inline styles, inline scripts)
- Injects them in the correct location in your HTML output

**How it works:**

1. Use the `rootBrick` shortcode in your base template to mark where dependencies should be injected
2. Use the `brick` shortcode to register and render brick components that declare their dependencies
3. The system automatically collects all dependencies and injects them when the page is built

**Usage:**

1. Enable `bricksRegistry` in your Eleventy config:

```javascript
import { bricksRegistry } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  bricksRegistry(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { bricksRegistry: true });
}
```

2. Add the `rootBrick` shortcode in your base template (typically in the `<head>` section):

```njk
<head>
  <meta charset="UTF-8">
  <title>My Site</title>
  {% rootBrick %}
  <!-- Other head content -->
</head>
```

3. Create brick components that declare their dependencies:

```javascript
// myBrick.js
export default {
  dependencies: [
    'https://cdn.example.com/library.css',
    'https://cdn.example.com/library.js'
  ],
  style: `
    .my-component { color: blue; }
  `,
  script: `
    console.log('Component initialized');
  `,
  render: function() {
    return '<div class="my-component">Hello World</div>';
  }
};
```

4. Use the `brick` shortcode in your templates:

```njk
{% set myBrick = require('./myBrick.js') %}
{% brick myBrick %}
```

**Brick Component Structure:**

A brick component is a JavaScript object with the following optional properties:

- `dependencies`: Array of URLs to external CSS or JavaScript files (e.g., `['https://cdn.example.com/style.css', 'https://cdn.example.com/script.js']`)
- `style`: String containing inline CSS
- `script`: String containing inline JavaScript
- `render`: Function that returns the HTML markup for the component

**Output:**

The system will automatically inject all dependencies in the order they were registered:

```html
<head>
  <meta charset="UTF-8">
  <title>My Site</title>
  <link rel="stylesheet" href="https://cdn.example.com/library.css">
  <style>.my-component { color: blue; }</style>
  <script src="https://cdn.example.com/library.js"></script>
  <script>console.log('Component initialized');</script>
  <!-- Other head content -->
</head>
```

**Features:**

- Automatic dependency collection per page
- Categorizes dependencies (CSS vs JS, external vs inline)
- Deduplicates dependencies (using Sets internally)
- Works with both external URLs and inline code
- Clears registry before each build to prevent stale data

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
