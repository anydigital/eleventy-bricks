# Section Filter Examples

## Basic Usage

```markdown
<!--section:intro-->

This is the introduction section.

<!--section:main-->

This is the main content.

<!--section:footer-->

This is the footer.
```

In your template:

```nunjucks
{{ content | section('intro') }}
```

Output:

```
This is the introduction section.
```

## Multiple Names per Section

```markdown
<!--section:summary,abstract-->

This content appears in both 'summary' and 'abstract' sections.

<!--section:conclusion-->

Final thoughts.
```

Both of these work:

```nunjucks
{{ content | section('summary') }}
{{ content | section('abstract') }}
```

## Real-World Example

```markdown
# Research Paper

<!--section:abstract,summary-->

A brief overview of the research findings.

<!--section:introduction-->

Background and context for the research.

<!--section:methodology-->

How the research was conducted.

<!--section:results-->

Key findings from the study.

<!--section:conclusion,summary-->

Summary and implications of the research.
```

Usage:

```nunjucks
<!-- Get full summary (abstract + conclusion) -->
<div class="summary">
  {{ content | section('summary') }}
</div>

<!-- Get just introduction -->
<div class="intro">
  {{ content | section('introduction') }}
</div>
```

## Notes

- Section names are **case-insensitive**: `intro`, `INTRO`, and `Intro` are all the same
- Multiple names can be comma-separated: `<!--section:name1,name2,name3-->`
- Whitespace around names is trimmed
- Content extends from the section marker to the next `<!--section*>` or EOF
- If a section name appears multiple times, all matching sections are concatenated
