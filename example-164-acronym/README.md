# example-164-acronym

Minimal Docusaurus 3 site demonstrating the `acronym` field proposal for
[docusaurus-plugin-glossary](https://github.com/mcclowes/docusaurus-plugin-glossary).

**Issue:** [#164 — acronym field](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164)

## What this demo shows

The existing `abbreviation` field handles terms where the **short form is
canonical** (the user looks up "API"). The proposed `acronym` field handles
the opposite direction: the **full name is canonical** and the acronym is the
short label appended on first use.

| Field | Canonical | Short form | First-use display |
|---|---|---|---|
| `abbreviation` | `"API"` | `"Application Programming Interface"` | `API (Application Programming Interface)` |
| `acronym` (new) | `"Web Content Accessibility Guidelines"` | `"WCAG"` | `Web Content Accessibility Guidelines (WCAG)` |

The acronym value is also auto-registered as an alias, so both the full name
and the short form link to the same glossary entry.

```json
{
  "term": "Web Content Accessibility Guidelines",
  "acronym": "WCAG",
  "aliases": ["WCAG"],
  "definition": "…"
}
```

## Local files

| Path | Purpose |
|---|---|
| `src/remark/glossary-sdc.cjs` | Remark plugin — `acronym` support + expansion logic |
| `src/theme/GlossaryTerm/` | Swizzled component |
| `src/components/GlossaryPage.tsx` | Extended glossary page |
| `src/plugins/glossary-page-override.cjs` | Swaps upstream `GlossaryPage.js` via `NormalModuleReplacementPlugin` |

## Running locally

```sh
npm install
npm start
```

Open <http://localhost:3000>. See [`/docs/acronym-demo`](http://localhost:3000/docs/acronym-demo)
for the first-use expansion and [`/docs/abbreviation-comparison`](http://localhost:3000/docs/abbreviation-comparison)
for a side-by-side comparison with `abbreviation`.
