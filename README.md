# eleventy-bricks

A collection of helpful utilities and filters for Eleventy (11ty).

## Installation

```bash
npm install @anydigital/eleventy-bricks
```

## Usage

You can use this library in two ways:

### Option 1: As a Plugin

Import and use the entire plugin. You can configure which helpers to enable using the options parameter:

**ES Modules:**

```javascript
import eleventyBricks from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBricks, {
    mdAutoRawTags: true,
    mdAutoNl2br: true,
    siteData: true,
    filters: ["attr", "where_in", "merge", "remove_tag", "if", "attr_concat"],
  });

  // Your other configuration...
}
```

**CommonJS:**

```javascript
const eleventyBricks = require("@anydigital/eleventy-bricks");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBricks, {
    mdAutoRawTags: true,
    mdAutoNl2br: true,
    siteData: true,
    filters: ["attr", "where_in", "merge", "remove_tag", "if", "attr_concat"],
  });

  // Your other configuration...
};
```

> **Note:** The CommonJS wrapper uses dynamic imports internally and returns async functions. Eleventy's `addPlugin()` method handles this automatically.

### Option 2: Import Individual Helpers (Recommended)

Import only the specific helpers you need without using the plugin:

**ES Modules:**

```javascript
import {
  mdAutoRawTags,
  mdAutoNl2br,
  setAttrFilter,
  whereInFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  siteData,
} from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  mdAutoRawTags(eleventyConfig);
  mdAutoNl2br(eleventyConfig);
  setAttrFilter(eleventyConfig);
  whereInFilter(eleventyConfig);
  mergeFilter(eleventyConfig);
  removeTagFilter(eleventyConfig);
  ifFilter(eleventyConfig);
  attrConcatFilter(eleventyConfig);
  siteData(eleventyConfig);

  // Your other configuration...
}
```

**CommonJS:**

```javascript
const {
  mdAutoRawTags,
  mdAutoNl2br,
  setAttrFilter,
  whereInFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  siteData,
} = require("@anydigital/eleventy-bricks");

module.exports = async function (eleventyConfig) {
  await mdAutoRawTags(eleventyConfig);
  await mdAutoNl2br(eleventyConfig);
  await setAttrFilter(eleventyConfig);
  await whereInFilter(eleventyConfig);
  await mergeFilter(eleventyConfig);
  await removeTagFilter(eleventyConfig);
  await ifFilter(eleventyConfig);
  await attrConcatFilter(eleventyConfig);
  await siteData(eleventyConfig);

  // Your other configuration...
};
```

> **Note:** When using CommonJS with individual helpers, the config function must be `async` and each helper must be `await`ed, as the CommonJS wrapper uses dynamic imports internally.

## Configuration Options

When using the plugin (Option 1), you can configure which helpers to enable:

| Option          | Type            | Default | Description                                                      |
| --------------- | --------------- | ------- | ---------------------------------------------------------------- |
| `mdAutoRawTags` | boolean         | `false` | Enable the mdAutoRawTags preprocessor for Markdown files         |
| `mdAutoNl2br`   | boolean         | `false` | Enable the mdAutoNl2br preprocessor to convert \n to `<br>` tags |
| `siteData`      | boolean         | `false` | Enable site.year and site.prod global data                       |
| `filters`       | array of string | `[]`    | Array of filter names to enable (see Available Filters section)  |

**Available filter names for the `filters` array:**

- `'attr'` - Override object attributes
- `'where_in'` - Filter collections by attribute values
- `'merge'` - Merge arrays or objects
- `'remove_tag'` - Remove HTML elements from content
- `'if'` - Inline conditional/ternary operator
- `'attr_concat'` - Concatenate values to an attribute array

**Example:**

```javascript
eleventyConfig.addPlugin(eleventyBricks, {
  mdAutoRawTags: true,
  mdAutoNl2br: true,
  siteData: true,
  filters: ["attr", "where_in", "merge", "remove_tag", "if", "attr_concat"],
});
```

## Available 11ty Helpers

### mdAutoRawTags

Prevents Nunjucks syntax from being processed in Markdown files by automatically wrapping `{{`, `}}`, `{%`, and `%}` with `{% raw %}` tags.

**Why use this?**

When writing documentation or tutorials about templating in Markdown files, you often want to show Nunjucks/Liquid syntax as literal text. This preprocessor automatically escapes these special characters so they display as-is instead of being processed by the template engine.

**Usage:**

1. Enable `mdAutoRawTags` in your Eleventy config:

```javascript
import { mdAutoRawTags } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
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
import { mdAutoNl2br } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  mdAutoNl2br(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { mdAutoNl2br: true });
}
```

**Example:**

In your Markdown file:

```markdown
| Column 1               | Column 2                          |
| ---------------------- | --------------------------------- |
| Line 1\nLine 2\nLine 3 | Another cell\nWith multiple lines |
```

Will render as:

```html
<td>Line 1<br />Line 2<br />Line 3</td>
<td>Another cell<br />With multiple lines</td>
```

**Note:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.

### attr

A filter that creates a new object with an overridden attribute value. This is useful for modifying data objects in templates without mutating the original.

**Why use this?**

When working with Eleventy data, you sometimes need to modify an object's properties for a specific use case. The `attr` filter provides a clean way to create a modified copy of an object without affecting the original.

**Usage:**

1. Enable the `attr` filter in your Eleventy config:

```javascript
import { setAttrFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  setAttrFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['attr'] });
}
```

2. Use the filter in your templates:

```njk
{# Create a modified version of a page object #}
{% set modifiedPage = page | attr('title', 'New Title') %}

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
{% set updatedPost = post | attr('featured', true) %}

{# Chain multiple attr filters #}
{% set modifiedPost = post
  | attr('category', 'blog')
  | attr('priority', 1)
%}

{# Use in loops #}
{% for item in collection %}
  {% set enhancedItem = item | attr('processed', true) %}
  {# ... use enhancedItem ... #}
{% endfor %}
```

### where_in

A filter that filters collection items by attribute value. It checks if an item's attribute matches a target value. If the attribute is an array, it checks if the array includes the target value. Supports nested attribute names using dot notation.

**Why use this?**

When working with Eleventy collections, you often need to filter items based on front matter data. The `where_in` filter provides a flexible way to filter by any attribute, with special handling for array attributes (like tags) and support for nested properties using dot notation.

**Usage:**

1. Enable the `where_in` filter in your Eleventy config:

```javascript
import { whereInFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  whereInFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['where_in'] });
}
```

2. Use the filter in your templates:

**Filter by exact attribute match:**

```njk
{# Get all posts with category 'blog' #}
{% set blogPosts = collections.all | where_in('data.category', 'blog') %}

{% for post in blogPosts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

**Filter by array attribute (tags):**

```njk
{# Get all posts that include 'javascript' tag #}
{% set jsPosts = collections.all | where_in('data.tags', 'javascript') %}

{% for post in jsPosts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

**Parameters:**

- `collection`: The collection to filter (array of items)
- `attrName`: The attribute name to check (string, supports dot notation for nested properties)
- `targetValue`: The value to match against (any type)

**Features:**

- Works with any attribute in front matter
- Supports dot notation for nested properties (e.g., `'data.tags'`, `'data.author.name'`)
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
{# Filter by category (using dot notation for nested properties) #}
{% set blogPosts = collections.all | where_in('data.category', 'blog') %}

{# Filter by tag (array) #}
{% set jsTutorials = collections.all | where_in('data.tags', 'javascript') %}

{# Filter by numeric value #}
{% set highPriority = collections.all | where_in('data.priority', 1) %}

{# Chain filters #}
{% set recentBlogPosts = collections.all | where_in('data.category', 'blog') | reverse | limit(5) %}
```

### merge

A filter that merges arrays or objects together, similar to Twig's merge filter. For arrays, it concatenates them. For objects, it performs a shallow merge where later values override earlier ones.

**Why use this?**

When working with data in templates, you often need to combine multiple arrays or objects. The `merge` filter provides a clean way to merge data structures without writing custom JavaScript, making it easy to combine collections, merge configuration objects, or aggregate data from multiple sources.

**Usage:**

1. Enable the `merge` filter in your Eleventy config:

```javascript
import { mergeFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  mergeFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['merge'] });
}
```

2. Use the filter in your templates:

**Merge arrays:**

```njk
{# Combine two arrays #}
{% set allItems = featured | merge(regular) %}

{# Merge multiple arrays #}
{% set combined = array1 | merge(array2, array3, array4) %}

{% for item in allItems %}
  <p>{{ item }}</p>
{% endfor %}
```

**Merge objects:**

```njk
{# Merge configuration objects #}
{% set defaultConfig = { theme: 'light', lang: 'en' } %}
{% set userConfig = { theme: 'dark' } %}
{% set finalConfig = defaultConfig | merge(userConfig) %}

{# Result: { theme: 'dark', lang: 'en' } #}
```

**Parameters:**

- `first`: The first array or object (the base to merge into)
- `...rest`: One or more arrays or objects to merge in

**Features:**

- Works with both arrays and objects
- Supports merging multiple items at once
- Non-mutating: Creates new arrays/objects, leaving originals unchanged
- For objects: Later values override earlier ones (shallow merge)
- For arrays: Concatenates all arrays together
- Handles null/undefined gracefully

**Examples:**

```njk
{# Combine featured and regular posts #}
{% set featuredPosts = collections.all | where_in('data.featured', true) %}
{% set regularPosts = collections.all | where_in('data.featured', false) %}
{% set allPosts = featuredPosts | merge(regularPosts) %}

{# Merge page metadata with defaults #}
{% set defaultMeta = {
  author: 'Site Admin',
  category: 'general',
  comments: false
} %}
{% set pageMeta = defaultMeta | merge(page.data) %}

{# Combine arrays of tags #}
{% set commonTags = ['javascript', 'html', 'css'] %}
{% set specialTags = page.data.tags or [] %}
{% set allTags = commonTags | merge(specialTags) %}

{# Merge multiple configuration sources #}
{% set config = defaults | merge(siteConfig, pageConfig, userPrefs) %}
```

### remove_tag

A filter that removes a specified HTML element from provided HTML content. It removes the tag along with its content, including self-closing tags.

**Why use this?**

When working with content from external sources or user-generated content, you may need to strip certain HTML tags for security or presentation purposes. The `remove_tag` filter provides a simple way to remove unwanted tags like `<script>`, `<style>`, or any other HTML elements from your content.

**Usage:**

1. Enable the `remove_tag` filter in your Eleventy config:

```javascript
import { removeTagFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  removeTagFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['remove_tag'] });
}
```

2. Use the filter in your templates:

```njk
{# Remove all script tags from content #}
{% set cleanContent = htmlContent | remove_tag('script') %}

{{ cleanContent | safe }}
```

**Parameters:**

- `html`: The HTML content to process (string)
- `tagName`: The tag name to remove (string)

**Features:**

- Removes both opening and closing tags along with their content
- Handles self-closing tags (e.g., `<br />`, `<img />`)
- Handles tags with attributes
- Case-insensitive matching
- Non-destructive: Returns new string, doesn't modify original

**Examples:**

```njk
{# Remove scripts from user-generated content #}
{% set userContent = '<p>Hello</p><script>alert("XSS")</script><p>World</p>' %}
{% set safeContent = userContent | remove_tag('script') %}
{# Result: '<p>Hello</p><p>World</p>' #}

{# Strip specific formatting tags #}
{% set formatted = '<div><strong>Bold</strong> and <em>italic</em> text</div>' %}
{% set noStrong = formatted | remove_tag('strong') %}
{# Result: '<div>Bold and <em>italic</em> text</div>' #}

{# Chain multiple remove_tag filters for multiple tags #}
{% set richContent = page.content %}
{% set stripped = richContent
  | remove_tag('script')
  | remove_tag('style')
  | remove_tag('iframe')
%}

{# Remove images for text-only preview #}
{% set textOnly = htmlContent | remove_tag('img') %}
```

**Security Note:**

While this filter can help sanitize HTML content, it should not be relied upon as the sole security measure. For critical security requirements, use a dedicated HTML sanitization library on the server side before content reaches your templates.

### if

An inline conditional/ternary operator filter that returns one value if a condition is truthy, and another if it's falsy. Similar to Nunjucks' inline if syntax.

**Why use this?**

When you need simple conditional values in templates without verbose if/else blocks, the `if` filter provides a clean inline solution. It's especially useful for class names, attributes, or displaying alternate text based on conditions.

**Usage:**

1. Enable the `if` filter in your Eleventy config:

```javascript
import { ifFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  ifFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['if'] });
}
```

2. Use the filter in your templates:

```njk
{# Basic usage #}
<div class="{{ 'active' | if: isActive, 'inactive' }}">Status</div>

{# Without falsy value (defaults to empty string) #}
<span class="{{ 'highlight' | if: shouldHighlight }}">Text</span>

{# With variable values #}
{% set status = 'Published' | if: post.published, 'Draft' %}
```

**Parameters:**

- `trueValue`: The value to return if condition is truthy
- `condition`: The condition to evaluate
- `falseValue`: The value to return if condition is falsy (optional, defaults to empty string)

**Features:**

- Returns `trueValue` if condition is truthy, otherwise returns `falseValue`
- Treats empty objects `{}` as falsy
- Default `falseValue` is an empty string if not provided
- Works with any data type for values

**Examples:**

```njk
{# Toggle CSS classes #}
<button class="{{ 'btn-primary' | if: isPrimary, 'btn-secondary' }}">
  Click me
</button>

{# Display different text #}
<p>{{ 'Online' | if: user.isOnline, 'Offline' }}</p>

{# Use with boolean values #}
{% set isEnabled = true %}
<div>{{ 'Enabled' | if: isEnabled, 'Disabled' }}</div>

{# Conditional attribute values #}
<input type="checkbox" {{ 'checked' | if: isChecked }}>

{# With numeric values #}
<span class="{{ 'has-items' | if: items.length }}">
  {{ items.length }} items
</span>

{# Chain with other filters #}
{% set cssClass = 'featured' | if: post.featured | upper %}
```

### attr_concat

A filter that concatenates values to an attribute array, returning a new object with the combined array. Useful for adding items to arrays like tags, classes, or other list-based attributes.

**Why use this?**

When working with objects that have array attributes (like tags), you often need to add additional values without mutating the original object. The `attr_concat` filter provides a clean way to combine existing array values with new ones, automatically handling duplicates.

**Usage:**

1. Enable the `attr_concat` filter in your Eleventy config:

```javascript
import { attrConcatFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  attrConcatFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['attr_concat'] });
}
```

2. Use the filter in your templates:

```njk
{# Add tags to a post object #}
{% set enhancedPost = post | attr_concat('tags', ['featured', 'popular']) %}

{# Add a single value #}
{% set updatedPost = post | attr_concat('tags', 'important') %}

{# Add values from a JSON string #}
{% set modifiedPost = post | attr_concat('tags', '["new", "trending"]') %}
```

**Parameters:**

- `obj`: The object to modify
- `attr`: The attribute name (must be an array or will be treated as one)
- `values`: Values to concatenate (can be an array, JSON string array, or single value)

**Returns:**

A new object with the specified attribute containing the combined unique array. The original object is not modified.

**Features:**

- Non-mutating: Creates a new object, leaving the original unchanged
- Automatically removes duplicates using Set
- Handles multiple input types: arrays, JSON string arrays, or single values
- Creates the attribute as an empty array if it doesn't exist
- Logs an error if the existing attribute is not an array

**Examples:**

```njk
{# Add multiple tags #}
{% set post = { title: 'My Post', tags: ['javascript'] } %}
{% set enhancedPost = post | attr_concat('tags', ['tutorial', 'beginner']) %}
{# Result: { title: 'My Post', tags: ['javascript', 'tutorial', 'beginner'] } #}

{# Add single value #}
{% set updatedPost = post | attr_concat('tags', 'featured') %}
{# Result: { title: 'My Post', tags: ['javascript', 'tutorial', 'beginner', 'featured'] } #}

{# No duplicates #}
{% set deduped = post | attr_concat('tags', ['javascript', 'advanced']) %}
{# Result: Only 'advanced' is added, 'javascript' already exists #}

{# Chain multiple attr_concat filters #}
{% set finalPost = post
  | attr_concat('tags', 'popular')
  | attr_concat('categories', ['tech', 'programming'])
%}

{# Use in loops to enhance collection items #}
{% for item in collections.posts %}
  {% set enhancedItem = item | attr_concat('data.tags', 'blog') %}
  {# ... use enhancedItem ... #}
{% endfor %}
```

### siteData

Adds global site data to your Eleventy project, providing commonly needed values that can be accessed in all templates.

**Why use this?**

Many websites need access to the current year (for copyright notices) and environment information (to conditionally enable features based on production vs development). This helper provides these as global `site` data without manually setting them up.

**Usage:**

1. Enable `siteData` in your Eleventy config:

```javascript
import { siteData } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
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
{% if site.prod %}
  <!-- Production-only features -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
{% else %}
  <!-- Development-only features -->
  <div class="dev-toolbar">Development Mode</div>
{% endif %}
```

**Available Data:**

- `site.year`: The current year as a number (e.g., `2026`)
- `site.prod`: Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`)

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
{% if site.prod %}
  <script src="/analytics.js"></script>
{% endif %}

{# Different behavior in dev vs prod #}
{% if site.prod %}
  <link rel="stylesheet" href="/css/styles.min.css">
{% else %}
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/live-reload.js"></script>
{% endif %}
```

### Additional Exports

The plugin also exports the following utility functions for advanced usage:

- `transformAutoRaw(content)`: The transform function used by `mdAutoRawTags` preprocessor. Can be used programmatically to wrap Nunjucks syntax with raw tags.
- `transformNl2br(content)`: The transform function used by `mdAutoNl2br` preprocessor. Can be used programmatically to convert `\n` sequences to `<br>` tags.
- `merge(first, ...rest)`: The core merge function used by the `merge` filter. Can be used programmatically to merge arrays or objects.
- `removeTag(html, tagName)`: The core function used by the `remove_tag` filter. Can be used programmatically to remove HTML tags from content.
- `iff(trueValue, condition, falseValue)`: The core conditional function used by the `if` filter. Can be used programmatically as a ternary operator.
- `attrConcat(obj, attr, values)`: The core function used by the `attr_concat` filter. Can be used programmatically to concatenate values to an attribute array.

## Starter Configuration Files

The package includes pre-configured starter files in `node_modules/@anydigital/eleventy-bricks/src/` that you can symlink to your project for quick setup:

### Available Starter Files

#### eleventy.config.js

A fully-configured Eleventy config file with:

- All eleventy-bricks plugins enabled
- Eleventy Navigation plugin
- Markdown-it with anchors
- YAML data support
- CLI input directory support
- Symlink support for development

**Required dependencies:**

```bash
npm install @11ty/eleventy-navigation markdown-it markdown-it-anchor js-yaml minimist
```

**Symlink to your project:**

```bash
ln -s node_modules/@anydigital/eleventy-bricks/src/eleventy.config.js eleventy.config.js
```

#### admin/index.html

A ready-to-use Sveltia CMS admin interface for content management.

**Symlink to your project:**

```bash
mkdir -p admin
ln -s ../node_modules/@anydigital/eleventy-bricks/src/admin/index.html admin/index.html
```

### Benefits of Symlinking

- **Always up-to-date**: Configuration automatically updates when you upgrade the package
- **Less maintenance**: No need to manually sync configuration changes
- **Quick setup**: Get started immediately with best-practice configurations
- **Easy customization**: Override specific settings by creating your own config that imports from the symlinked version

### Alternative: Copy Files

If you prefer to customize the configurations extensively, you can copy the files instead:

```bash
cp node_modules/@anydigital/eleventy-bricks/src/eleventy.config.js .
mkdir -p admin
cp node_modules/@anydigital/eleventy-bricks/src/admin/index.html admin/
```

## Development Workflow Setup

### Using the `do` Folder Pattern

This package provides a pre-configured `do` folder setup that helps organize your development workflow using npm workspaces. The `do` folder contains scripts for building and running your Eleventy project.

**Setup:**

1. Create a `do` folder in your project root:

```bash
mkdir do
```

2. Symlink the package.json from the eleventy-bricks package:

```bash
ln -s node_modules/@anydigital/eleventy-bricks/src/do/package.json do/package.json
```

3. Configure your root `package.json` to use npm workspaces:

```json
{
  "name": "my-project",
  "workspaces": ["do"],
  "scripts": {
    "build": "npm -w do run build",
    "start": "npm -w do run start"
  }
}
```

**Usage:**

Run your Eleventy project:

```bash
npm start
```

Build for production:

```bash
npm run build
```

**Available Scripts in `do` folder:**

- `build` - Build the site with Eleventy and minify CSS with Tailwind
- `start` - Start Eleventy dev server with live reload and Tailwind watch mode
- `stage` - Clean build and serve locally for preview
- `11ty` - Run Eleventy commands directly
- `11ty:clean` - Remove the `_site` output directory
- `tw` - Run Tailwind CSS commands

**Benefits:**

- **Clean separation**: Keep build scripts separate from project configuration
- **Reusable workflows**: Update scripts by upgrading the package
- **Workspace isolation**: Scripts run in their own workspace context
- **Easy maintenance**: No need to manually maintain build scripts

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
- Eleventy >= 2.0.0 (supports both 2.x and 3.x)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
