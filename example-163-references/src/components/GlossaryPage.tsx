import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './GlossaryPage.module.css';
import type { GlossaryData, GlossaryTerm } from 'docusaurus-plugin-glossary';

// definitionType jest naszym polem — nie ma go w typach pluginu
interface SdcGlossaryTerm extends GlossaryTerm {
  definitionType?: string;
  acronym?: string; // pole SDC — skrót przy pełnej nazwie (nie `abbreviation` z pluginu)
}

// ─── stałe ────────────────────────────────────────────────────────────────────

const DEFAULT_TITLE = 'Słownik';
const DEFAULT_DESCRIPTION = 'Zbiór pojęć i ich definicji';
const LOCALE_PL = 'pl';
const SEARCH_INPUT_ID = 'glossary-search';

const DEFINITION_TYPE_LABELS: Record<string, string> = {
  legal:     'Prawna',
  normative: 'Normatywna',
  official:  'Oficjalna',
  industry:  'Branżowa',
  sdc:       'SDC',
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function groupTermsByLetter(terms: SdcGlossaryTerm[]): Record<string, SdcGlossaryTerm[]> {
  const grouped: Record<string, SdcGlossaryTerm[]> = {};

  for (const term of terms) {
    const firstLetter = term.term.charAt(0).toUpperCase();

    if (grouped[firstLetter] === undefined) {
      grouped[firstLetter] = [];
    }

    grouped[firstLetter].push(term);
  }

  for (const letter of Object.keys(grouped)) {
    grouped[letter].sort((a, b) => a.term.localeCompare(b.term, LOCALE_PL));
  }

  return grouped;
}

// ─── główny komponent ──────────────────────────────────────────────────────────

export default function GlossaryPage({ glossaryData }: { glossaryData?: GlossaryData | null }) {
  const [searchTerm, setSearchTerm] = useState('');

  const terms = useMemo(
    () => (glossaryData?.terms ?? []) as SdcGlossaryTerm[],
    [glossaryData?.terms],
  );

  const termIds = useMemo(
    () =>
      new Map(
        terms.map(term => [
          term.term.toLowerCase(),
          term.id ?? term.term.toLowerCase().replace(/\s+/g, '-'),
        ]),
      ),
    [terms],
  );

  const filteredTerms = useMemo(() => {
    if (searchTerm.length === 0) {
      return terms;
    }

    const lowerSearch = searchTerm.toLowerCase();

    return terms.filter(term => {
      const haystack = [
        term.term,
        term.definition,
        term.abbreviation,
        term.documentation?.label,
        ...(term.aliases ?? []),
        ...(term.references ?? []).map(r => r.label),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(lowerSearch);
    });
  }, [terms, searchTerm]);

  const groupedTerms = useMemo(() => groupTermsByLetter(filteredTerms), [filteredTerms]);
  const letters = Object.keys(groupedTerms).sort((a, b) => a.localeCompare(b, LOCALE_PL));

  const glossaryTitle = glossaryData?.title ?? DEFAULT_TITLE;

  return (
    <Layout title={glossaryTitle} description="Słownik pojęć i definicji">
      <div className={styles.glossaryContainer}>
        <header className={styles.glossaryHeader}>
          <h1>{glossaryTitle}</h1>
          <p className={styles.glossaryDescription}>
            {glossaryData?.description ?? DEFAULT_DESCRIPTION}
          </p>
          <div className={styles.searchContainer}>
            <label htmlFor={SEARCH_INPUT_ID} className={styles.searchLabel}>
              Szukaj pojęć
            </label>
            <input
              id={SEARCH_INPUT_ID}
              type="search"
              placeholder="np. dostępność cyfrowa"
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {filteredTerms.length === 0 ? (
          <div className={styles.noResults}>
            <p>Nie znaleziono pojęć pasujących do „{searchTerm}"</p>
          </div>
        ) : (
          <div className={styles.glossaryContent}>
            <nav className={styles.letterNav}>
              {letters.map(letter => (
                <a key={letter} href={`#letter-${letter}`} className={styles.letterLink}>
                  {letter}
                </a>
              ))}
            </nav>

            {letters.map(letter => (
              <section key={letter} id={`letter-${letter}`} className={styles.letterSection}>
                <h2 className={styles.letterHeading}>{letter}</h2>
                <dl className={styles.termList}>
                  {groupedTerms[letter].map((term, index) => (
                    <div
                      key={`${letter}-${index}`}
                      className={styles.termItem}
                      id={term.id ?? term.term.toLowerCase().replace(/\s+/g, '-')}
                    >
                      <dt className={styles.termName}>
                        {term.term}
                        {(typeof term.acronym === 'string' || typeof term.abbreviation === 'string') && (
                          <span className={styles.abbreviation}> ({term.acronym ?? term.abbreviation})</span>
                        )}
                        {typeof term.definitionType === 'string' && (
                          <span className={styles.definitionTypeBadge}>
                            {DEFINITION_TYPE_LABELS[term.definitionType] ?? term.definitionType}
                          </span>
                        )}
                      </dt>
                      <dd className={styles.termDefinition}>
                        {term.definition}
                        {typeof term.documentation === 'object' && term.documentation !== null && (
                          <div className={styles.documentation}>
                            <Link to={term.documentation.path}>
                              {typeof term.documentation.label === 'string' ? term.documentation.label : 'Czytaj więcej'}
                            </Link>
                          </div>
                        )}
                        {term.references !== undefined && term.references.length > 0 && (
                          <div className={styles.references}>
                            <strong>Źródła:</strong>{' '}
                            {term.references.map((reference, idx) => (
                              <React.Fragment key={`${reference.url}-${idx}`}>
                                {idx > 0 && ', '}
                                <a href={reference.url}>{reference.label}</a>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        {term.relatedTerms !== undefined && term.relatedTerms.length > 0 && (
                          <div className={styles.relatedTerms}>
                            <strong>Pojęcia powiązane:</strong>{' '}
                            {term.relatedTerms.map((related, idx) => (
                              <React.Fragment key={idx}>
                                {idx > 0 && ', '}
                                <a
                                  href={`#${termIds.get(related.toLowerCase()) ?? related.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {related}
                                </a>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}

        <footer className={styles.glossaryFooter}>
          <p>Łączna liczba pojęć: {terms.length}</p>
        </footer>
      </div>
    </Layout>
  );
}
