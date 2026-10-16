# example-129-link-only-first-occurrence

Minimal Docusaurus 3 site demonstrating `linkOnlyFirstOccurrence` for
[docusaurus-plugin-glossary](https://github.com/mcclowes/docusaurus-plugin-glossary).

**Issue:** [#129 — linkOnlyFirstOccurrence](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129)

## What this demo shows

With `linkOnlyFirstOccurrence: true`, each glossary term is auto-linked only on
its **first occurrence** per document. Compare:

| Page | Behaviour |
|---|---|
| `/docs/with-option` | First occurrence linked, subsequent ones plain text |
| `/docs/without-option` | Every occurrence linked (default) |

## Status

`linkOnlyFirstOccurrence` is **merged on the upstream `master` branch**
(`src/remark/glossary-terms.ts`) but has **not yet been released on npm**
(latest stable release: v3.4.0 does not include it).

`package.json` therefore points to the GitHub `master` branch directly:

```json
"docusaurus-plugin-glossary": "github:mcclowes/docusaurus-plugin-glossary"
```

Once the feature is published to npm, change this back to a semver range
(e.g. `"^3.5.0"`) and the demo will work with the stable release.

## Running locally

```sh
npm install
npm start
```

Open <http://localhost:3000>.
