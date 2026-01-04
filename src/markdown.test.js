import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { transformAutoRaw, transformNl2br } from "./markdown.js";

describe("transformAutoRaw", () => {
  it("should wrap opening double curly braces with raw tags", () => {
    const input = "Use {{ variable }} to output.";
    const expected =
      "Use {% raw %}{{{% endraw %} variable {% raw %}}}{% endraw %} to output.";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should wrap closing double curly braces with raw tags", () => {
    const input = "{{ name }}";
    const expected =
      "{% raw %}{{{% endraw %} name {% raw %}}}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should wrap opening template tags with raw tags", () => {
    const input = "{% if condition %}";
    const expected =
      "{% raw %}{%{% endraw %} if condition {% raw %}%}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should wrap closing template tags with raw tags", () => {
    const input = "{% endif %}";
    const expected =
      "{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should handle multiple Nunjucks patterns in one string", () => {
    const input = "{{ var1 }} and {% if test %} something {% endif %}";
    const expected =
      "{% raw %}{{{% endraw %} var1 {% raw %}}}{% endraw %} and {% raw %}{%{% endraw %} if test {% raw %}%}{% endraw %} something {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should handle multiline content with Nunjucks syntax", () => {
    const input = `# Title
{{ variable }}
Some text
{% for item in items %}
  {{ item }}
{% endfor %}`;
    const expected = `# Title
{% raw %}{{{% endraw %} variable {% raw %}}}{% endraw %}
Some text
{% raw %}{%{% endraw %} for item in items {% raw %}%}{% endraw %}
  {% raw %}{{{% endraw %} item {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}`;
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should return unchanged content when no Nunjucks syntax is present", () => {
    const input = "This is just plain text with no templates.";
    assert.equal(transformAutoRaw(input), input);
  });

  it("should handle empty string", () => {
    assert.equal(transformAutoRaw(""), "");
  });

  it("should handle content with only Nunjucks syntax", () => {
    const input = "{{}}";
    const expected =
      "{% raw %}{{{% endraw %}{% raw %}}}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should handle consecutive Nunjucks patterns", () => {
    const input = "{{{{}}}}";
    const expected =
      "{% raw %}{{{% endraw %}{% raw %}{{{% endraw %}{% raw %}}}{% endraw %}{% raw %}}}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });

  it("should wrap each delimiter individually", () => {
    const input = "Show {{ and }} and {% and %}";
    const expected =
      "Show {% raw %}{{{% endraw %} and {% raw %}}}{% endraw %} and {% raw %}{%{% endraw %} and {% raw %}%}{% endraw %}";
    assert.equal(transformAutoRaw(input), expected);
  });
});

describe("transformNl2br", () => {
  it("should convert single \\n to <br>", () => {
    const input = "Line 1\\nLine 2";
    const expected = "Line 1<br>Line 2";
    assert.equal(transformNl2br(input), expected);
  });

  it("should convert double \\n\\n to <br>", () => {
    const input = "Line 1\\n\\nLine 2";
    const expected = "Line 1<br>Line 2";
    assert.equal(transformNl2br(input), expected);
  });

  it("should convert multiple \\n sequences", () => {
    const input = "Line 1\\nLine 2\\nLine 3";
    const expected = "Line 1<br>Line 2<br>Line 3";
    assert.equal(transformNl2br(input), expected);
  });

  it("should handle mixed single and double \\n", () => {
    const input = "Line 1\\n\\nLine 2\\nLine 3";
    const expected = "Line 1<br>Line 2<br>Line 3";
    assert.equal(transformNl2br(input), expected);
  });

  it("should handle text without \\n", () => {
    const input = "Just plain text";
    assert.equal(transformNl2br(input), input);
  });

  it("should handle empty content", () => {
    assert.equal(transformNl2br(""), "");
  });

  it("should handle content with only \\n", () => {
    const input = "\\n\\n\\n";
    const expected = "<br><br>";
    assert.equal(transformNl2br(input), expected);
  });

  it("should handle markdown table cell content with \\n", () => {
    const input = "Cell 1\\nCell 1 Line 2\\n\\nCell 1 Line 3";
    const expected = "Cell 1<br>Cell 1 Line 2<br>Cell 1 Line 3";
    assert.equal(transformNl2br(input), expected);
  });

  it("should handle multiple consecutive double \\n\\n", () => {
    const input = "Line 1\\n\\n\\n\\nLine 2";
    const expected = "Line 1<br><br>Line 2";
    assert.equal(transformNl2br(input), expected);
  });

  it("should preserve actual newlines (not literal \\n)", () => {
    const input = "Line 1\nLine 2";
    const expected = "Line 1\nLine 2";
    assert.equal(transformNl2br(input), expected);
  });

  it("should only convert literal backslash-n sequences", () => {
    const input = "Text with\\nbackslash-n and\nreal newline";
    const expected = "Text with<br>backslash-n and\nreal newline";
    assert.equal(transformNl2br(input), expected);
  });
});

