---
title: "acronym vs. abbreviation"
sidebar_label: "vs. abbreviation"
---

# acronym vs. abbreviation

The plugin already supports the `abbreviation` field (canonical = short form):

| Field | Canonical entry | Short form | First-use display |
|---|---|---|---|
| `abbreviation` | `"API"` | `"Application Programming Interface"` | `API (Application Programming Interface)` |
| `acronym` (new) | `"Web Content Accessibility Guidelines"` | `"WCAG"` | `Web Content Accessibility Guidelines (WCAG)` |

---

## abbreviation (existing)

The existing field is designed for entries where the abbreviation **is** the
term people look up:

```json
{
  "term": "API",
  "abbreviation": "Application Programming Interface",
  "definition": "..."
}
```

With `expandAcronymsOnFirstUse: true`, the first hit of `"API"` expands to
`"API (Application Programming Interface)"`.

Example: API is the contract between client and server. Good API design
matters.

---

## acronym (proposed — issue #164)

The new field is for entries where the **full name** is canonical and the
short form is secondary:

```json
{
  "term": "Web Content Accessibility Guidelines",
  "acronym": "WCAG",
  "aliases": ["WCAG"],
  "definition": "..."
}
```

With `expandAcronymsOnFirstUse: true`, the first hit of the full name expands
to `"Web Content Accessibility Guidelines (WCAG)"`.

Example: The Web Content Accessibility Guidelines are the international
standard for accessible web content. Conformance with WCAG is required
by many accessibility laws.
