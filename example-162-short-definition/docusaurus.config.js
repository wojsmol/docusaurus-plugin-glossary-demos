// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _require = createRequire(import.meta.url);

/**
 * Demo: issue #162 — shortDefinition field
 * https://github.com/mcclowes/docusaurus-plugin-glossary/issues/162
 *
 * The `shortDefinition` field provides a concise tooltip text separate from
 * the full definition on the glossary page. When present it takes priority;
 * when absent the full `definition` is used as fallback.
 *
 * Requires the local remark plugin (src/remark/glossary-sdc.cjs) and the
 * swizzled GlossaryTerm component (src/theme/GlossaryTerm/) until the field
 * is supported natively by docusaurus-plugin-glossary.
 */
const remarkGlossarySdc = _require('./src/remark/glossary-sdc.cjs');

const glossaryOptions = {
  glossaryPath: 'glossary/glossary.json',
  routePath: '/glossary',
  siteDir: __dirname,
};

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'Demo: shortDefinition (#162)',
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
      title: 'Demo #162',
      items: [
        { to: '/docs/short-definition', label: 'shortDefinition demo', position: 'left' },
        { to: '/glossary', label: 'Glossary', position: 'right' },
      ],
    },
  },
};
