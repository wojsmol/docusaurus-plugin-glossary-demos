---
title: acronym field demo
---

# acronym field demo

The `acronym` field handles terms where the **canonical entry is the full name**
and the short form is secondary — the opposite of the existing `abbreviation`
field.

With `expandAcronymsOnFirstUse: true`, the first occurrence of the full term in
a document is displayed as **"Full Name (ACR)"**.

The short form (e.g. `WCAG`) is also registered as an alias, so writing either
the full name or the acronym in a document produces a link to the same entry.

---

## First use — full name expands

The Web Content Accessibility Guidelines define three conformance levels:
A, AA, and AAA. Most regulations require at least AA conformance.

Accessible Rich Internet Applications extends native HTML semantics for
dynamic content. Assistive technology vendors implement ARIA patterns.

## Subsequent uses — no expansion

Understanding WCAG is essential for accessible product development.
The WCAG success criteria are organised into four principles.
WCAG 2.2 is the current recommendation.

ARIA attributes must be used correctly to avoid confusing screen-reader users.
Incorrect ARIA usage can be worse than no ARIA at all.
