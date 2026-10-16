# example-162-short-definition

Minimal Docusaurus 3 site demonstrating the `shortDefinition` field proposal for
[docusaurus-plugin-glossary](https://github.com/mcclowes/docusaurus-plugin-glossary).

**Issue:** [#162 — shortDefinition field](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162)

## What this demo shows

A term in `glossary.json` may have a `shortDefinition` alongside its full
`definition`. The tooltip shown on hover uses `shortDefinition` when present,
falling back to the full `definition` otherwise.

```json
{
  "term": "digital accessibility",
  "definition": "The practice of making websites … (long)",
  "shortDefinition": "Designing websites and tools usable by people with disabilities."
}
```

## Local files

| Path | Purpose |
|---|---|
| `src/remark/glossary-sdc.cjs` | Remark plugin — passes `shortDefinition` as a prop to `GlossaryTerm` |
| `src/theme/GlossaryTerm/` | Swizzled component — displays `shortDefinition` in the tooltip |

These files are temporary scaffolding. Once the feature is merged upstream, they
can be removed and replaced by the plugin's own implementation.

## Running locally

```sh
npm install
npm start
```

Open <http://localhost:3000>.
