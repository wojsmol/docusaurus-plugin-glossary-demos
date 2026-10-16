# upstream-demos — dema do otwartych issues `docusaurus-plugin-glossary`

Folder zawiera demonstracje rozwiązań dla otwartych issues pluginu
[`docusaurus-plugin-glossary`](https://github.com/mcclowes/docusaurus-plugin-glossary).

Każde rozwiązanie zostało zaimplementowane w projekcie SDC jako patch lokalny
(`src/remark/glossary-sdc.cjs` + swizzlowany `GlossaryTerm`). Gdy autor pluginu
zmerguje daną funkcję do upstream i wyda nową wersję npm, odpowiedni patch można
wyrzucić (patrz: issue #395 w repo SDC).

---

## Spis dem

| Folder | Issue | Opis |
|--------|-------|------|
| [`issue-129-link-only-first-occurrence/`](./issue-129-link-only-first-occurrence/) | [#129](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129) | Linkowanie tylko pierwszego wystąpienia hasła w pliku |
| [`issue-162-short-definition/`](./issue-162-short-definition/) | [#162](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162) | Krótka definicja dla dymka (`shortDefinition`) |
| [`issue-163-references-definition-type/`](./issue-163-references-definition-type/) | [#163](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163) | Źródła definicji (`references`) i typ definicji (`definitionType`) |
| [`issue-164-acronym/`](./issue-164-acronym/) | [#164](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164) | Pole skrótu przy haśle kanonicznym (`acronym`) |

---

## Architektura patchy

Wszystkie rozszerzenia żyją w dwóch miejscach:

```
documentation/
├── src/
│   ├── remark/
│   │   └── glossary-sdc.cjs          # remark plugin z rozszerzeniami
│   ├── theme/
│   │   └── GlossaryTerm/
│   │       └── index.tsx             # swizzlowany komponent (wzorzec tooltip-popover)
│   └── components/
│       └── GlossaryPage.tsx          # strona słownika (NormalModuleReplacementPlugin)
└── docusaurus.config.ts              # podpięcie remarkGlossarySdc zamiast getRemarkPlugin
```

### Schemat przepływu danych

```
slownik.json
    │
    ▼
glossary-sdc.cjs (remark)
    │  czyta pola: term, definition, shortDefinition, acronym,
    │              definitionType, references
    │
    ▼
<GlossaryTerm                         ← w treści dokumentacji (MDX)
  term="..."
  definition="..."
  shortDefinition="..."               ← issue #162
  acronym="..."                       ← issue #164
  definitionType="..."                ← issue #163
  references="[{...}]"               ← issue #163 (JSON string)
/>
    │
    ▼  (tylko pierwsze wystąpienie — issue #129)
    └─ dymek: shortDefinition ?? definition

GlossaryPage.tsx                      ← strona /slownik
    │  wyświetla: term (+acronym/abbreviation), definitionType badge,
    │             definition, references, relatedTerms, documentation
    └─ źródło danych: glossaryData z pluginu (nie props komponentu)
```

---

## Status upstream (stan na październik 2025)

| Issue | Status |
|-------|--------|
| [#129](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129) | Otwarte — brak PR |
| [#162](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162) | Otwarte — brak PR |
| [#163](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163) | Otwarte — brak PR |
| [#164](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164) | Otwarte — brak PR |
| [#158](https://github.com/mcclowes/docusaurus-plugin-glossary/issues/158) | **Zamknięte** — fix w commicie [`94c81ff`](https://github.com/mcclowes/docusaurus-plugin-glossary/commit/94c81ff17830105d7324a3edc43b1284f2224fc6), czeka na npm release |

---

## Jak używać dem przy zgłaszaniu PR do upstream

Każdy folder zawiera:
- `README.md` — opis problemu, rozwiązania i uwagi do upstream
- `glossary-fragment.json` — minimalny przykład YAML demonstrujący pole
- plik `.tsx` lub `.cjs` — fragment kodu implementacji

Pliki są gotowe do załączenia jako przykłady w opisie PR lub issue.
