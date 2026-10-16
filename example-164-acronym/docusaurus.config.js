// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _require = createRequire(import.meta.url);

/**
 * Demo: issue #164 — acronym field
 * https://github.com/mcclowes/docusaurus-plugin-glossary/issues/164
 *
 * The existing `abbreviation` field handles "short form → full name" terms
 * (e.g. canonical: "API", abbreviation: "Application Programming Interface").
 *
 * The proposed `acronym` field handles the opposite direction: the canonical
 * entry is the full name, and the acronym is the short label appended on first
 * use (e.g. canonical: "Web Content Accessibility Guidelines", acronym: "WCAG").
 *
 * The acronym value is also auto-linked as an alias, so writing "WCAG" in
 * a document links to the same term as the full name.
 *
 * Requires the local remark plugin (src/remark/glossary-sdc.cjs), the swizzled
 * GlossaryTerm (src/theme/GlossaryTerm/), and the extended GlossaryPage
 * (src/components/) until the field is supported natively.
 */
const glossaryPageOverride = _require('./src/plugins/glossary-page-override.cjs');
const remarkGlossarySdc = _require('./src/remark/glossary-sdc.cjs');

const glossaryOptions = {
  glossaryPath: 'glossary/glossary.json',
  routePath: '/glossary',
  siteDir: __dirname,
  expandAcronymsOnFirstUse: true,
};

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'Demo: acronym field (#164)',
  url: 'http://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [[
    '@docusaurus/preset-classic',
    {
      docs: {
        sidebarPath: path.resolve(__dirname, './sidebars.js'),
        remarkPlugins: [[remarkGlossarySdc, glossaryOptions]],
      },
      blog: false,
      pages: {},
      theme: { customCss: path.resolve(__dirname, './src/css/custom.css') },
    },
  ]],

  plugins: [
    ['docusaurus-plugin-glossary', { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' }],
    glossaryPageOverride,
    function nodeModulesFallback() {
      return {
        name: 'webpack-node-modules-fallback',
        configureWebpack() {
          return { resolve: { fallback: { path: false, fs: false, url: false } } };
        },
      };
    },
  ],

  themeConfig: {
    navbar: {
      title: 'Demo #164',
      items: [
        { to: '/docs/acronym-demo',             label: 'acronym demo',          position: 'left' },
        { to: '/docs/abbreviation-comparison',  label: 'vs. abbreviation',      position: 'left' },
        { to: '/glossary',                       label: 'Glossary',              position: 'right' },
      ],
    },
  },
};
