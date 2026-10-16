# example-163-references

Minimal Docusaurus 3 site demonstrating `references` and `definitionType` fields
for [docusaurus-plugin-glossary](https://github.com/mcclowes/docusaurus-plugin-glossary).

**Issue:** [#163 — references & definitionType](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163)

## What this demo shows

Two fields on glossary terms:

- **`references`** — `Array<{ label: string; url: string }>` — source links
  shown at the bottom of each entry on the glossary page.
- **`definitionType`** — `string` (e.g. `"normative"`, `"legal"`) — a badge
  classifying the definition.

```json
{
  "term": "WCAG",
  "definition": "…",
  "definitionType": "normative",
  "references": [
    { "label": "WCAG 2.2 (W3C Recommendation)", "url": "https://www.w3.org/TR/WCAG22/" }
  ]
}
```

## Status

| Field | Upstream status |
|---|---|
| `references` | Already in `GlossaryTerm` type and rendered by `GlossaryPage` |
| `definitionType` | **Not yet in upstream** — requires local patch (see below) |

## Local files

| Path | Purpose |
|---|---|
| `src/remark/glossary-sdc.cjs` | Remark plugin — passes `definitionType` / `references` as props |
| `src/theme/GlossaryTerm/` | Swizzled component |
| `src/components/GlossaryPage.tsx` | Extended glossary page — renders `definitionType` badge |
| `src/plugins/glossary-page-override.cjs` | Docusaurus plugin — swaps upstream `GlossaryPage.js` via `NormalModuleReplacementPlugin` |

## Running locally

```sh
npm install
npm start
```

Open <http://localhost:3000> and navigate to the Glossary page to see references
and definitionType badges.
