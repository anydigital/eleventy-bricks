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
    mdAutoRawTags: true  // Enable mdAutoRawTags preprocessor (default: false)
  });
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const eleventyBricks = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBricks, {
    mdAutoRawTags: true  // Enable mdAutoRawTags preprocessor (default: false)
  });
  
  // Your other configuration...
};
```

### Option 2: Import Individual Helpers (Recommended)

Import only the specific helpers you need without using the plugin:

**ES Modules:**
```javascript
import { bricks, mdAutoRawTags, siteData } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  bricks(eleventyConfig);
  mdAutoRawTags(eleventyConfig);
  siteData(eleventyConfig);
  
  // Your other configuration...
}
```

**CommonJS:**
```javascript
const { bricks, mdAutoRawTags, siteData } = require("@anydigital/11ty-bricks");

module.exports = function(eleventyConfig) {
  bricks(eleventyConfig);
  mdAutoRawTags(eleventyConfig);
  siteData(eleventyConfig);
  
  // Your other configuration...
};
```

## Configuration Options

When using the plugin (Option 1), you can configure which helpers to enable:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `bricks` | boolean | `false` | Enable the bricks system for dependency management |
| `mdAutoRawTags` | boolean | `false` | Enable the mdAutoRawTags preprocessor for Markdown files |
| `mdAutoNl2br` | boolean | `false` | Enable the mdAutoNl2br preprocessor to convert \n to `<br>` tags |
| `fragments` | boolean | `false` | Enable the fragment shortcode for including content from fragments |
| `setAttrFilter` | boolean | `false` | Enable the setAttr filter for overriding object attributes |
| `byAttrFilter` | boolean | `false` | Enable the byAttr filter for filtering collections by attribute values |
| `siteData` | boolean | `false` | Enable site.year and site.isProd global data |

**Example:**
```javascript
eleventyConfig.addPlugin(eleventyBricks, {
  bricks: true,
  mdAutoRawTags: true,
  byAttrFilter: true,
  siteData: true
});
```

## Available 11ty Helpers

### bricks

A dependency management system for Eleventy that automatically collects and injects CSS and JavaScript dependencies (both external and inline) per page. This allows brick components to declare their dependencies, and the system will inject them in the correct location in your HTML.

**Why use this?**

When building reusable components (bricks) in Eleventy, you often need to include CSS and JavaScript dependencies. Instead of manually adding these to every page, `bricks` automatically:
- Collects dependencies from all bricks used on a page
- Categorizes them (external CSS, external JS, inline styles, inline scripts)
- Injects them in the correct location in your HTML output

**How it works:**

1. Use the `bricksDependencies` shortcode in your base template to mark where dependencies should be injected
2. Use the `brick` shortcode to register and render brick components that declare their dependencies
3. The system automatically collects all dependencies and injects them when the page is built

**Usage:**

1. Enable `bricks` in your Eleventy config:

```javascript
import { bricks } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  bricks(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { bricks: true });
}
```

2. Add the `bricksDependencies` shortcode in your base template (typically in the `<head>` section):

```njk
<head>
  <meta charset="UTF-8">
  <title>My Site</title>
  {% bricksDependencies [
    ... (global dependencies can be set here) ...
  ] %}
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

### mdAutoRawTags

Prevents Nunjucks syntax from being processed in Markdown files by automatically wrapping `{{`, `}}`, `{%`, and `%}` with `{% raw %}` tags.

**Why use this?**

When writing documentation or tutorials about templating in Markdown files, you often want to show Nunjucks/Liquid syntax as literal text. This preprocessor automatically escapes these special characters so they display as-is instead of being processed by the template engine.

**Usage:**

1. Enable `mdAutoRawTags` in your Eleventy config:

```javascript
import { mdAutoRawTags } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  mdAutoRawTags(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { mdAutoRawTags: true });
}
```

**Example:**

Before `mdAutoRawTags`, writing this in Markdown:
```markdown
Use {{ variable }} to output variables.
```

Would try to process `{{ variable }}` as a template variable. With `mdAutoRawTags`, it displays exactly as written.

### mdAutoNl2br

Automatically converts `\n` sequences to `<br>` tags in Markdown content. This is particularly useful for adding line breaks inside Markdown tables where standard newlines don't work.

**Why use this?**

Markdown tables don't support multi-line content in cells. By using `\n` in your content, this preprocessor will convert it to `<br>` tags, allowing you to display line breaks within table cells and other content.

**Usage:**

1. Enable `mdAutoNl2br` in your Eleventy config:

```javascript
import { mdAutoNl2br } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  mdAutoNl2br(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { mdAutoNl2br: true });
}
```

**Example:**

In your Markdown file:
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Line 1\nLine 2\nLine 3 | Another cell\nWith multiple lines |
```

Will render as:
```html
<td>Line 1<br>Line 2<br>Line 3</td>
<td>Another cell<br>With multiple lines</td>
```

**Note:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.

### fragment

A shortcode that includes content from fragment files stored in the `_fragments` directory. The content will be processed by the template engine.

**Why use this?**

Fragments allow you to organize reusable content snippets in a dedicated directory and include them in your templates. This is useful for:
- Reusable content blocks
- Shared template sections
- Component-like content organization

**Usage:**

1. Enable `fragments` in your Eleventy config:

```javascript
import { fragments } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  fragments(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { fragments: true });
}
```

2. Create fragment files in the `_fragments` directory (relative to your input directory):

```
your-project/
  _fragments/
    header.njk
    footer.njk
    callout.md
```

3. Use the `fragment` shortcode in your templates:

```njk
{% fragment "header.njk" %}

<main>
  <!-- Your content -->
</main>

{% fragment "footer.njk" %}
```

**Parameters:**

- `path`: The path to the fragment file relative to the `_fragments` directory

**Features:**

- Reads files from `_fragments` directory in your input directory
- Content is processed by the template engine
- Supports any template language that Eleventy supports
- Shows helpful error comment if fragment is not found

**Example:**

Create `_fragments/callout.njk`:
```njk
<div class="callout callout-{{ type | default('info') }}">
  {{ content }}
</div>
```

Use it in your template:
```njk
{% set type = "warning" %}
{% set content = "This is important!" %}
{% fragment "callout.njk" %}
```

### setAttr

A filter that creates a new object with an overridden attribute value. This is useful for modifying data objects in templates without mutating the original.

**Why use this?**

When working with Eleventy data, you sometimes need to modify an object's properties for a specific use case. The `setAttr` filter provides a clean way to create a modified copy of an object without affecting the original.

**Usage:**

1. Enable `setAttr` in your Eleventy config:

```javascript
import { setAttr } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  setAttr(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { setAttrFilter: true });
}
```

2. Use the filter in your templates:

```njk
{# Create a modified version of a page object #}
{% set modifiedPage = page | setAttr('title', 'New Title') %}

<h1>{{ modifiedPage.title }}</h1>
<p>Original title: {{ page.title }}</p>
```

**Parameters:**

- `obj`: The object to modify
- `key`: The attribute name to set (string)
- `value`: The value to set for the attribute (any type)

**Returns:**

A new object with the specified attribute set to the given value. The original object is not modified.

**Features:**

- Non-mutating: Creates a new object, leaving the original unchanged
- Works with any object type
- Supports any attribute name and value type
- Can be chained with other filters

**Examples:**

```njk
{# Override a single attribute #}
{% set updatedPost = post | setAttr('featured', true) %}

{# Chain multiple setAttr filters #}
{% set modifiedPost = post 
  | setAttr('category', 'blog') 
  | setAttr('priority', 1) 
%}

{# Use in loops #}
{% for item in collection %}
  {% set enhancedItem = item | setAttr('processed', true) %}
  {# ... use enhancedItem ... #}
{% endfor %}
```

### byAttr

A filter that filters collection items by attribute value. It checks if an item's attribute matches a target value. If the attribute is an array, it checks if the array includes the target value.

**Why use this?**

When working with Eleventy collections, you often need to filter items based on front matter data. The `byAttr` filter provides a flexible way to filter by any attribute, with special handling for array attributes (like tags).

**Usage:**

1. Enable `byAttr` in your Eleventy config:

```javascript
import { byAttr } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  byAttr(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { byAttrFilter: true });
}
```

2. Use the filter in your templates:

**Filter by exact attribute match:**
```njk
{# Get all posts with category 'blog' #}
{% set blogPosts = collections.all | byAttr('category', 'blog') %}

{% for post in blogPosts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

**Filter by array attribute (tags):**
```njk
{# Get all posts that include 'javascript' tag #}
{% set jsPosts = collections.all | byAttr('tags', 'javascript') %}

{% for post in jsPosts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

**Parameters:**

- `collection`: The collection to filter (array of items)
- `attrName`: The attribute name to check (string)
- `targetValue`: The value to match against (any type)

**Features:**

- Works with any attribute in front matter
- Handles both `item.data.attrName` and `item.attrName` patterns
- Special handling for array attributes (uses `includes()` check)
- Returns empty array if collection is invalid
- Filters out items without the specified attribute

**Examples:**

Front matter:
```yaml
---
title: My Post
category: blog
tags: [javascript, tutorial, beginner]
priority: 1
---
```

Template usage:
```njk
{# Filter by category #}
{% set blogPosts = collections.all | byAttr('category', 'blog') %}

{# Filter by tag (array) #}
{% set jsTutorials = collections.all | byAttr('tags', 'javascript') %}

{# Filter by numeric value #}
{% set highPriority = collections.all | byAttr('priority', 1) %}

{# Chain filters #}
{% set recentBlogPosts = collections.all | byAttr('category', 'blog') | reverse | limit(5) %}
```

### siteData

Adds global site data to your Eleventy project, providing commonly needed values that can be accessed in all templates.

**Why use this?**

Many websites need access to the current year (for copyright notices) and environment information (to conditionally enable features based on production vs development). This helper provides these as global `site` data without manually setting them up.

**Usage:**

1. Enable `siteData` in your Eleventy config:

```javascript
import { siteData } from "@anydigital/11ty-bricks";

export default function(eleventyConfig) {
  siteData(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { siteData: true });
}
```

2. Use the global data in your templates:

**Current Year:**
```njk
<footer>
  <p>&copy; {{ site.year }} Your Company Name. All rights reserved.</p>
</footer>
```

**Environment Check:**
```njk
{% if site.isProd %}
  <!-- Production-only features -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
{% else %}
  <!-- Development-only features -->
  <div class="dev-toolbar">Development Mode</div>
{% endif %}
```

**Available Data:**

- `site.year`: The current year as a number (e.g., `2026`)
- `site.isProd`: Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`)

**Features:**

- Automatically updates the year value
- Detects production vs development mode based on `ELEVENTY_RUN_MODE` environment variable
- Available globally in all templates without manual setup
- No configuration required

**Examples:**

```njk
{# Copyright notice #}
<p>Copyright &copy; {{ site.year }} My Site</p>

{# Conditional loading of analytics #}
{% if site.isProd %}
  <script src="/analytics.js"></script>
{% endif %}

{# Different behavior in dev vs prod #}
{% if site.isProd %}
  <link rel="stylesheet" href="/css/styles.min.css">
{% else %}
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/live-reload.js"></script>
{% endif %}
```

### Additional Exports

The plugin also exports the following for advanced usage:

- `transformAutoRaw(content)`: The transform function used by `mdAutoRawTags` preprocessor. Can be used programmatically to wrap Nunjucks syntax with raw tags.
- `transformNl2br(content)`: The transform function used by `mdAutoNl2br` preprocessor. Can be used programmatically to convert `\n` sequences to `<br>` tags.

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
