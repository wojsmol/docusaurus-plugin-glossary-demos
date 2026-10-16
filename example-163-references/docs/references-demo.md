---
title: references & definitionType demo
---

# references & definitionType demo

This demo shows two related fields:

- **`references`** — an array of `{ label, url }` source-attribution links,
  displayed at the bottom of each term on the glossary page.
  Already supported in the upstream plugin's `GlossaryTerm` type.
- **`definitionType`** — classifies the definition source (e.g. `"normative"`,
  `"legal"`). Displayed as a badge on the glossary page.
  Requires the extended `GlossaryPage` (see `src/components/`) until
  upstream support is added.

---

## Normative terms

WCAG defines the baseline for accessible web content. Following WCAG is often
a legal requirement in public-sector procurement.

ARIA extends HTML semantics to make dynamic content understandable to assistive
technologies. ARIA should complement semantic HTML, not replace it.

## Legal terms

Plain language requirements apply to many government and financial documents.
Writing in plain language improves comprehension for all readers.

## Terms with references only

Semantic HTML helps both users and machines understand content structure.
Screen readers, search engines, and other tools rely on semantic HTML.

---

Open the [Glossary](/glossary) page to see references and definitionType badges
rendered for each term.
