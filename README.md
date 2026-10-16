# docusaurus-plugin-glossary — demo projects

Minimal Docusaurus 3 sites demonstrating proposed features for
[docusaurus-plugin-glossary](https://github.com/mcclowes/docusaurus-plugin-glossary).

Each folder is a self-contained Docusaurus project. Run `npm install && npm start`
inside any of them to see the feature in action.

## Demos

| Folder | Issue | Feature |
|---|---|---|
| [`example-129-link-only-first-occurrence`](./example-129-link-only-first-occurrence/) | [#129](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129) | Link only the first occurrence of a term per page |
| [`example-162-short-definition`](./example-162-short-definition/) | [#162](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162) | `shortDefinition` field for concise tooltip text |
| [`example-163-references`](./example-163-references/) | [#163](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163) | `references` (source links) and `definitionType` (badge) fields |
| [`example-164-acronym`](./example-164-acronym/) | [#164](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164) | `acronym` field — full-name canonical entry with short-form expansion |

## Upstream status

| Issue | Status | Notes |
|---|---|---|
| [#129](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129) | ✅ Already in upstream | `linkOnlyFirstOccurrence` is in v3.4.0; demo uses `getRemarkPlugin` directly |
| [#162](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162) | 🔄 Open | Requires local remark plugin + swizzled `GlossaryTerm` |
| [#163](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163) | 🔄 Partial | `references` already upstream; `definitionType` requires local `GlossaryPage` patch |
| [#164](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164) | 🔄 Open | Requires local remark plugin + swizzled `GlossaryTerm` + extended `GlossaryPage` |

## Running a demo

```sh
cd example-162-short-definition   # or any other folder
npm install
npm start
```

Open <http://localhost:3000>.

## Local files (where present)

| Path | Purpose |
|---|---|
| `src/remark/glossary-sdc.cjs` | Extended remark plugin — passes extra props to `GlossaryTerm` |
| `src/theme/GlossaryTerm/` | Swizzled component — tooltip with `shortDefinition` / `acronym` support |
| `src/components/GlossaryPage.tsx` | Extended glossary page — renders `definitionType` badge |
| `src/plugins/glossary-page-override.cjs` | Docusaurus plugin — swaps upstream `GlossaryPage.js` via webpack `NormalModuleReplacementPlugin` |

These local files are temporary scaffolding. Once a feature is merged upstream and
released on npm, the corresponding local files can be removed.
