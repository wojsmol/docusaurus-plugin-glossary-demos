// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import { getRemarkPlugin } from 'docusaurus-plugin-glossary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Demo: issue #129 — linkOnlyFirstOccurrence
 * https://github.com/mcclowes/docusaurus-plugin-glossary/issues/129
 *
 * With linkOnlyFirstOccurrence: true, only the first occurrence of each
 * glossary term per file is auto-linked. Subsequent occurrences are plain text.
 *
 * Compare /docs/with-option (linkOnlyFirstOccurrence: true) and
 * /docs/without-option (default behaviour, all occurrences linked).
 */

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'Demo: linkOnlyFirstOccurrence (#129)',
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
        remarkPlugins: [
          getRemarkPlugin(
            { glossaryPath: 'glossary/glossary.json', routePath: '/glossary', linkOnlyFirstOccurrence: true },
            { siteDir: __dirname }
          ),
        ],
      },
      blog: false,
      pages: {},
      theme: { customCss: path.resolve(__dirname, './src/css/custom.css') },
    },
  ]],

  plugins: [
    ['docusaurus-plugin-glossary', { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' }],
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
      title: 'Demo #129',
      items: [
        { to: '/docs/with-option',    label: 'linkOnlyFirstOccurrence: true',  position: 'left' },
        { to: '/docs/without-option', label: 'linkOnlyFirstOccurrence: false', position: 'left' },
        { to: '/glossary',            label: 'Glossary',                        position: 'right' },
      ],
    },
  },
};
