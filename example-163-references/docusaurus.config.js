// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { getRemarkPlugin } from 'docusaurus-plugin-glossary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _require = createRequire(import.meta.url);

/**
 * Demo: issue #163 — references and definitionType fields
 * https://github.com/mcclowes/docusaurus-plugin-glossary/issues/163
 *
 * `references` (array of { label, url }) — source attribution links, already
 *   supported in docusaurus-plugin-glossary types and displayed on the glossary
 *   page by the built-in GlossaryPage component.
 *
 * `definitionType` — classifies the definition source (e.g. "normative",
 *   "legal"). Displayed as a badge on the glossary page. Not in the plugin yet;
 *   requires the extended GlossaryPage (src/components/) swapped in via
 *   NormalModuleReplacementPlugin (src/plugins/glossary-page-override.cjs).
 */
const glossaryPageOverride = _require('./src/plugins/glossary-page-override.cjs');
const remarkGlossarySdc = _require('./src/remark/glossary-sdc.cjs');

const glossaryOptions = {
  glossaryPath: 'glossary/glossary.json',
  routePath: '/glossary',
  siteDir: __dirname,
};

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'Demo: references & definitionType (#163)',
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
      title: 'Demo #163',
      items: [
        { to: '/docs/references-demo', label: 'references & definitionType', position: 'left' },
        { to: '/glossary', label: 'Glossary', position: 'right' },
      ],
    },
  },
};
