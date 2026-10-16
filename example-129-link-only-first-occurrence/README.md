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

`linkOnlyFirstOccurrence` is **already implemented** in `docusaurus-plugin-glossary`
v3.4.0. This demo uses the upstream `getRemarkPlugin` directly — no local
patch is needed.

## Running locally

```sh
npm install
npm start
```

Open <http://localhost:3000>.
