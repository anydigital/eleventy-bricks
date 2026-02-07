# `@anydigital/eleventy-bricks`

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
    autoLinkFavicons: true,
    siteData: true,
    filters: ["attr_set", "attr_includes", "merge", "remove_tag", "if", "attr_concat", "section", "fetch"],
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
    autoLinkFavicons: true,
    siteData: true,
    filters: ["attr_set", "attr_includes", "merge", "remove_tag", "if", "attr_concat", "section", "fetch"],
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
  autoLinkFavicons,
  attrSetFilter,
  attrIncludesFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  sectionFilter,
  fetchFilter,
  siteData,
} from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  mdAutoRawTags(eleventyConfig);
  mdAutoNl2br(eleventyConfig);
  autoLinkFavicons(eleventyConfig);
  attrSetFilter(eleventyConfig);
  attrIncludesFilter(eleventyConfig);
  mergeFilter(eleventyConfig);
  removeTagFilter(eleventyConfig);
  ifFilter(eleventyConfig);
  attrConcatFilter(eleventyConfig);
  sectionFilter(eleventyConfig);
  // fetchFilter is only available if @11ty/eleventy-fetch is installed
  if (fetchFilter) {
    fetchFilter(eleventyConfig);
  }
  siteData(eleventyConfig);

  // Your other configuration...
}
```

**CommonJS:**

```javascript
const {
  mdAutoRawTags,
  mdAutoNl2br,
  autoLinkFavicons,
  attrSetFilter,
  attrIncludesFilter,
  mergeFilter,
  removeTagFilter,
  ifFilter,
  attrConcatFilter,
  sectionFilter,
  fetchFilter,
  siteData,
} = require("@anydigital/eleventy-bricks");

module.exports = async function (eleventyConfig) {
  await mdAutoRawTags(eleventyConfig);
  await mdAutoNl2br(eleventyConfig);
  await autoLinkFavicons(eleventyConfig);
  await attrSetFilter(eleventyConfig);
  await attrIncludesFilter(eleventyConfig);
  await mergeFilter(eleventyConfig);
  await removeTagFilter(eleventyConfig);
  await ifFilter(eleventyConfig);
  await attrConcatFilter(eleventyConfig);
  await sectionFilter(eleventyConfig);
  // fetchFilter is only available if @11ty/eleventy-fetch is installed
  if (fetchFilter) {
    await fetchFilter(eleventyConfig);
  }
  await siteData(eleventyConfig);

  // Your other configuration...
};
```

> **Note:** When using CommonJS with individual helpers, the config function must be `async` and each helper must be `await`ed, as the CommonJS wrapper uses dynamic imports internally.

## Configuration Options

When using the plugin (Option 1), you can configure which helpers to enable:

| Option             | Type            | Default | Description                                                      |
| ------------------ | --------------- | ------- | ---------------------------------------------------------------- |
| `mdAutoRawTags`    | boolean         | `false` | Enable the mdAutoRawTags preprocessor for Markdown files         |
| `mdAutoNl2br`      | boolean         | `false` | Enable the mdAutoNl2br preprocessor to convert \n to `<br>` tags |
| `autoLinkFavicons` | boolean         | `false` | Enable the autoLinkFavicons transform to add favicons to links   |
| `siteData`         | boolean         | `false` | Enable site.year and site.prod global data                       |
| `filters`          | array of string | `[]`    | Array of filter names to enable (see Available Filters section)  |

**Available filter names for the `filters` array:**

- `'attr_set'` - Override object attributes
- `'attr_includes'` - Filter collections by attribute values
- `'merge'` - Merge arrays or objects
- `'remove_tag'` - Remove HTML elements from content
- `'if'` - Inline conditional/ternary operator
- `'attr_concat'` - Concatenate values to an attribute array
- `'section'` - Extract named sections from content marked with HTML comments
- `'fetch'` - Fetch remote URLs or local files (requires `@11ty/eleventy-fetch`)

**Example:**

```javascript
eleventyConfig.addPlugin(eleventyBricks, {
  mdAutoRawTags: true,
  mdAutoNl2br: true,
  autoLinkFavicons: true,
  siteData: true,
  filters: ["attr_set", "attr_includes", "merge", "remove_tag", "if", "attr_concat", "section", "fetch"],
});
```

### Additional Exports

The plugin also exports the following utility functions for advanced usage:

- `transformAutoRaw(content)`: The transform function used by `mdAutoRawTags` preprocessor. Can be used programmatically to wrap Nunjucks syntax with raw tags.
- `transformNl2br(content)`: The transform function used by `mdAutoNl2br` preprocessor. Can be used programmatically to convert `\n` sequences to `<br>` tags.
- `isPlainUrlText(linkText, domain)`: Helper function that checks if link text looks like a plain URL or domain.
- `cleanLinkText(linkText, domain)`: Helper function that cleans link text by removing protocol, domain, and leading slash.
- `buildFaviconLink(attrs, domain, text)`: Helper function that builds HTML for a link with favicon.
- `transformLink(match, attrs, url, linkText)`: The transform function used by `autoLinkFavicons` that transforms a single link to include a favicon.
- `replaceLinksInHtml(content, transformer)`: Helper function that replaces all anchor links in HTML content with transformed versions.
- `attrIncludes(collection, attrName, targetValue)`: The core logic for filtering collection items by checking if an attribute array includes a target value. Can be used programmatically to filter collections.
- `merge(first, ...rest)`: The core merge function used by the `merge` filter. Can be used programmatically to merge arrays or objects.
- `removeTag(html, tagName)`: The core function used by the `remove_tag` filter. Can be used programmatically to remove HTML tags from content.
- `iff(trueValue, condition, falseValue)`: The core conditional function used by the `if` filter. Can be used programmatically as a ternary operator.
- `attrConcat(obj, attr, values)`: The core function used by the `attr_concat` filter. Can be used programmatically to concatenate values to an attribute array.
- `attrSet(obj, key, value)`: The core function used by the `attr_set` filter. Can be used programmatically to override object attributes.
- `section(content, sectionName)`: The core function used by the `section` filter. Can be used programmatically to extract named sections from content.

## Features

<!--section:11ty-->

### Filters <sub>universal filters for `.njk` & `.liquid`</sub>

|      Input | Filter                            | Arguments                                          |
| ---------: | --------------------------------- | -------------------------------------------------- |
| {.divider} | Logical filters:                  |
|   `ANY \|` | [`if`](#if)                       | `TEST, OP, VALUE` <sub>currently only `TEST`</sub> |
| {.divider} | Filters for objects:              |
|   `OBJ \|` | [`merge`](#merge)                 | `OBJ2`                                             |
|   `OBJ \|` | [`attr_set`](#attr_set)           | `ATTR, VALUE`                                      |
|   `OBJ \|` | [`attr_concat`](#attr_concat)     | `ATTR, ARRAY2`                                     |
|   `OBJ \|` | [`attr_includes`](#attr_includes) | `ATTR, VALUE`                                      |
| {.divider} | Other filters:                    |
|   `URL \|` | [`fetch`](#fetch)                 |                                                    |
|  `HTML \|` | [`section`](#section)             | `NAME`                                             |
|  `HTML \|` | [`remove_tag`](#remove_tag)       | `TAG`                                              |

#### `attr_set`

A filter that creates a new object with an overridden attribute value. This is useful for modifying data objects in templates without mutating the original.

**Why use this?**

When working with Eleventy data, you sometimes need to modify an object's properties for a specific use case. The `attr_set` filter provides a clean way to create a modified copy of an object without affecting the original.

**Usage:**

1. Enable the `attr_set` filter in your Eleventy config:

```javascript
import { attrSetFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  attrSetFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['attr_set'] });
}
```

2. Use the filter in your templates:

```njk
{# Create a modified version of a page object #}
{% set modifiedPage = page | attr_set('title', 'New Title') %}

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
{% set updatedPost = post | attr_set('featured', true) %}

{# Chain multiple attr_set filters #}
{% set modifiedPost = post
  | attr_set('category', 'blog')
  | attr_set('priority', 1)
%}

{# Use in loops #}
{% for item in collection %}
  {% set enhancedItem = item | attr_set('processed', true) %}
  {# ... use enhancedItem ... #}
{% endfor %}
```

#### `attr_includes`

A filter that filters collection items by checking if an attribute array includes a target value. Supports nested attribute names using dot notation.

**Why use this?**

When working with Eleventy collections, you often need to filter items based on tags or other array attributes in front matter. The `attr_includes` filter provides a flexible way to filter by any array attribute, with support for nested properties using dot notation.

**Usage:**

1. Enable the `attr_includes` filter in your Eleventy config:

```javascript
import { attrIncludesFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  attrIncludesFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['attr_includes'] });
}
```

2. Use the filter in your templates:

**Filter by array attribute (tags):**

```njk
{# Get all posts that include 'javascript' tag #}
{% set jsPosts = collections.all | attr_includes('data.tags', 'javascript') %}

{% for post in jsPosts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

**Parameters:**

- `collection`: The collection to filter (array of items)
- `attrName`: The attribute name to check (string, supports dot notation for nested properties)
- `targetValue`: The value to check for in the array (any type)

**Features:**

- Works with any array attribute in front matter
- Supports dot notation for nested properties (e.g., `'data.tags'`, `'data.author.roles'`)
- Returns empty array if collection is invalid
- Filters out items where the specified attribute is not an array or doesn't exist

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
{# Filter by tag (array) using dot notation for nested properties #}
{% set jsTutorials = collections.all | attr_includes('data.tags', 'javascript') %}

{# Filter by numeric value in array #}
{% set highPriority = collections.all | attr_includes('data.priorities', 1) %}

{# Chain filters #}
{% set recentTutorials = collections.all | attr_includes('data.tags', 'tutorial') | reverse | limit(5) %}
```

#### `merge`

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
{% set featuredPosts = collections.all | attr_includes('data.featured', true) %}
{% set regularPosts = collections.all | attr_includes('data.featured', false) %}
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

#### `remove_tag`

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

#### `section`

A filter that extracts a named section from content marked with HTML comments. This is useful for splitting a single content file (like a Markdown post) into multiple parts that can be displayed and styled independently in your templates.

**Why use this?**

When working with Markdown content in Eleventy, you're usually limited to a single `content` variable. The `section` filter allows you to define multiple named sections within your content using simple HTML comments, giving you granular control over where different parts of your content appear in your layout.

**Usage:**

1. Enable the `section` filter in your Eleventy config:

```javascript
import { sectionFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  sectionFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['section'] });
}
```

2. Mark sections in your content file (e.g., `post.md`):

```markdown
# My Post

&lt;!--section:intro-->

This is the introduction that appears at the top of the page.

&lt;!--section:main-->

This is the main body of the post with all the details.

&lt;!--section:summary,sidebar-->

This content appears in both the summary and the sidebar!
```

3. Use the filter in your templates:

```njk
{# Get the intro section #}
<div class="page-intro">
  {{ content | section('intro') | safe }}
</div>

{# Get the main section #}
<article>
  {{ content | section('main') | safe }}
</article>

{# Get the sidebar section #}
<aside>
  {{ content | section('sidebar') | safe }}
</aside>
```

**Parameters:**

- `content`: The string content to process (usually `content` variable)
- `sectionName`: The name(s) of the section to extract (string)

**Features:**

- **Multiple names**: A single section can have multiple names separated by commas: `&lt;!--section:name1,name2-->`
- **Case-insensitive**: Section names are matched without regard to case
- **Multiple occurrences**: If a section name appears multiple times, the filter concatenates all matching sections
- **Non-destructive**: Returns extracted content without modifying the original input
- **EOF support**: Sections continue until the next `&lt;!--section*-->` marker or the end of the file

**Examples:**

```njk
{# Extract multiple sections with same name #}
{# Example content has two &lt;!--section:note--> blocks #}
<div class="notes-box">
  {{ content | section('note') | safe }}
</div>

{# Use case-insensitive names #}
{{ content | section('INTRO') | safe }}

{# Handle missing sections gracefully (returns empty string) #}
{% set footer = content | section('non-existent-section') %}
{% if footer %}
  <footer>{{ footer | safe }}</footer>
{% endif %}
```

**Syntax Rules:**

- Sections start with: `&lt;!--section:NAME-->` or `&lt;!--section:NAME1,NAME2-->`
- Sections end at the next `&lt;!--section*-->` marker or end of file
- Whitespace around names and inside comments is automatically trimmed

#### `if`

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

#### `attr_concat`

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

#### `fetch`

A filter that fetches content from remote URLs or local files. For remote URLs, it uses `@11ty/eleventy-fetch` to download and cache files. For local paths, it reads files relative to the input directory.

**Why use this?**

When building static sites, you often need to include content from external sources or reuse content from local files. The `fetch` filter provides a unified way to retrieve content from both remote URLs and local files, with automatic caching for remote resources to improve build performance.

**Requirements:**

This filter requires the `@11ty/eleventy-fetch` package to be installed:

```bash
npm install @11ty/eleventy-fetch
```

> **Note:** If `@11ty/eleventy-fetch` is not installed, this filter will not be available. The plugin automatically detects whether the package is installed and only enables the filter if it's present.

**Usage:**

1. Install the required dependency:

```bash
npm install @11ty/eleventy-fetch
```

2. Enable the `fetch` filter in your Eleventy config:

```javascript
import { fetchFilter } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  fetchFilter(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { filters: ['fetch'] });
}
```

3. Use the filter in your templates:

**Fetch remote URLs:**

```njk
{# Fetch content from a remote URL #}
{% set externalContent = "https://example.com/data.json" | fetch %}
{{ externalContent }}

{# Fetch and parse JSON #}
{% set apiData = "https://api.example.com/posts" | fetch %}
{% set posts = apiData | fromJson %}
```

**Fetch local files:**

```njk
{# Fetch content from a local file (relative to input directory) #}
{% set localData = "_data/content.txt" | fetch %}
{{ localData }}

{# Include content from another file #}
{% set snippet = "_includes/snippets/example.md" | fetch %}
{{ snippet | markdown | safe }}
```

**Parameters:**

- `url`: A URL (starting with `http://` or `https://`) or a local file path (relative to the input directory)

**Features:**

- **Remote URLs**: Downloads and caches content using `@11ty/eleventy-fetch`
  - Caches files for 1 day by default
  - Stores cached files in `[input-dir]/_downloads/` directory
  - Automatically revalidates after cache expires
- **Local files**: Reads files relative to the Eleventy input directory
  - No caching needed for local files
  - Supports any file type that can be read as text
- **Error handling**: Throws descriptive errors if fetching fails
- **Conditional loading**: Only available when `@11ty/eleventy-fetch` is installed

**Examples:**

```njk
{# Fetch and display remote content #}
{% set readme = "https://raw.githubusercontent.com/user/repo/main/README.md" | fetch %}
<div class="readme">
  {{ readme | markdown | safe }}
</div>

{# Fetch JSON data from API #}
{% set data = "https://api.example.com/data.json" | fetch %}
{% set items = data | fromJson %}
{% for item in items %}
  <p>{{ item.title }}</p>
{% endfor %}

{# Include local file content #}
{% set changelog = "CHANGELOG.md" | fetch %}
{{ changelog | markdown | safe }}

{# Fetch CSS from CDN and inline it #}
<style>
  {{ "https://cdn.example.com/styles.css" | fetch }}
</style>

{# Reuse content across pages #}
{% set sharedContent = "_includes/shared/footer.html" | fetch %}
{{ sharedContent | safe }}
```

**Cache Directory:**

Remote files are cached in the `_downloads` folder within your input directory:

```
your-project/
├── src/              (or your input directory)
│   ├── _downloads/   (cached remote files)
│   ├── index.njk
│   └── ...
```

**Use Cases:**

- Fetch content from external APIs during build time
- Include README files from GitHub repositories
- Reuse content from local files across multiple pages
- Download and inline external CSS or JavaScript
- Fetch data from headless CMS or external data sources
- Include shared content snippets without using Eleventy's include syntax

**Note:** The filter returns raw text content. Use Eleventy's built-in filters like `| safe`, `| markdown`, or `| fromJson` to process the content as needed.

### Transforms

#### mdAutoRawTags

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

#### mdAutoNl2br

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

#### autoLinkFavicons

Automatically adds favicon images from Google's favicon service to links that display plain URLs or domain names. This transform processes all HTML output files and adds inline favicon images next to link text that appears to be a plain URL.

**Why use this?**

When you have links in your content that display raw URLs or domain names (like `https://example.com/page`), adding favicons provides a visual indicator of the external site. This transform automatically detects these plain-text URL links and enhances them with favicon images, making them more visually appealing and easier to recognize.

**Usage:**

1. Enable `autoLinkFavicons` in your Eleventy config:

```javascript
import { autoLinkFavicons } from "@anydigital/eleventy-bricks";

export default function (eleventyConfig) {
  autoLinkFavicons(eleventyConfig);
  // Or use as plugin:
  // eleventyConfig.addPlugin(eleventyBricks, { autoLinkFavicons: true });
}
```

**How it works:**

The transform:

1. Scans all HTML output files for `<a>` tags
2. Checks if the link text appears to be a plain URL or domain
3. Extracts the domain from the URL
4. Removes the domain from the link text (keeping only the path)
5. Adds a favicon image from Google's favicon service inline with the remaining text

**Example:**

Before transformation:

```html
<a href="https://github.com/anydigital/eleventy-bricks">https://github.com/anydigital/eleventy-bricks</a>
```

After transformation:

```html
<a href="https://github.com/anydigital/eleventy-bricks" class="whitespace-nowrap" target="_blank">
  <i><img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" /></i>
  <span>/anydigital/eleventy-bricks</span>
</a>
```

**Rules:**

- Only applies to links where the text looks like a plain URL (contains the domain or starts with `http://`/`https://`)
- Removes the protocol and domain from the display text
- Removes the trailing slash from the display text
- Only applies if at least 3 characters remain after removing the domain (to avoid showing favicons for bare domain links)
- Uses Google's favicon service at `https://www.google.com/s2/favicons?domain=DOMAIN&sz=32`
- Adds `target="_blank"` to the transformed links (only if not already present)
- Adds `whitespace-nowrap` class to the link
- Wraps the link text in a `<span>` element
- The favicon is wrapped in an `<i>` tag for easy styling

**Styling:**

You can style the favicon icons with CSS:

```css
/* Style the favicon wrapper */
a i {
  display: inline-block;
  margin-right: 0.25em;
}

/* Style the favicon image */
a i img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
```

**Note:** This transform only processes HTML output files (those ending in `.html`). It does not modify the original content files.

### Global Data

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

### Symlinked Configuration Files

The package includes pre-configured starter files in `node_modules/@anydigital/eleventy-bricks/src/` that you can symlink to your project for quick setup:

Benefits of Symlinking:

- **Always up-to-date**: Configuration automatically updates when you upgrade the package
- **Less maintenance**: No need to manually sync configuration changes
- **Quick setup**: Get started immediately with best-practice configurations
- **Easy customization**: Override specific settings by creating your own config that imports from the symlinked version

If you prefer to customize the configurations extensively, you can copy the files instead.

#### eleventy.config.js

A fully-configured Eleventy config file with:

- All eleventy-bricks plugins enabled
- Eleventy Navigation plugin
- Table of Contents plugin (conditionally loaded if installed)
- Markdown-it with anchors and attributes
- YAML data support
- CLI input directory support
- Symlink support for development

**Required dependencies:**

```bash
npm install @11ty/eleventy-navigation markdown-it markdown-it-anchor markdown-it-attrs js-yaml minimist
```

**Optional dependencies:**

```bash
# For the fetch filter
npm install @11ty/eleventy-fetch

# For table of contents generation
npm install @uncenter/eleventy-plugin-toc
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

<!--section:npm,11ty-->

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
