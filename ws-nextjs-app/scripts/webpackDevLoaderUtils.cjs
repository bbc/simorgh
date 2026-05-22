'use strict';

/**
 * Traverses webpack module rules and inserts `loaderPath` immediately before
 * css-loader in every rule whose `use` array contains css-loader.
 * webpack processes loaders right-to-left, so a loader inserted before
 * css-loader at index N receives css-loader's JS output.
 */
const injectExtractLoader = (rules, loaderPath) => {
  rules.forEach(rule => {
    if (rule.oneOf) injectExtractLoader(rule.oneOf, loaderPath);
    if (!Array.isArray(rule.use)) return;
    const cssLoaderIndex = rule.use.findIndex(l =>
      (typeof l === 'string' ? l : l?.loader)?.includes('css-loader'),
    );
    if (cssLoaderIndex !== -1) {
      rule.use.splice(cssLoaderIndex, 0, loaderPath);
    }
  });
};

/**
 * Returns true when `use` (a webpack rule's `use` or `loader` value) resolves
 * to an ignore-loader (next/dist/compiled/ignore-loader). Handles string
 * paths, `{ loader }` objects, and single-item arrays.
 */
const isIgnoreLoader = use => {
  if (!use) return false;
  if (typeof use === 'string') return use.includes('ignore-loader');
  if (use.loader) return String(use.loader).includes('ignore-loader');
  if (Array.isArray(use) && use.length === 1) return isIgnoreLoader(use[0]);
  return false;
};

/**
 * Traverses webpack module rules and replaces ignore-loader rules whose
 * `test` regex matches SCSS/Sass files with `replacementUse`.
 *
 * `replacementUse` should be the full replacement `use` array, e.g.
 * `[DevCssExtractLoader, { loader: cssLoaderPath, options: {...} }, { loader: sassLoaderPath }]`.
 */
const replaceIgnoreLoaderForScss = (rules, replacementUse) => {
  rules.forEach(rule => {
    // Next.js wraps CSS rules in a oneOf container (no `use` of its own):
    //   { oneOf: [{ test: [/\.css$/, /\.scss$/], use: 'ignore-loader' }, ...] }
    // Recurse so we reach the actual ignore-loader rule inside.
    // https://github.com/vercel/next.js/blob/v16.2.6/packages/next/src/build/webpack/config/blocks/css/index.ts#L372
    if (rule.oneOf) replaceIgnoreLoaderForScss(rule.oneOf, replacementUse);
    if (!isIgnoreLoader(rule.use) && !isIgnoreLoader(rule.loader)) return;
    if (!rule.test || !/scss|sass/i.test(rule.test.toString())) return;
    // eslint-disable-next-line no-param-reassign
    delete rule.loader;
    // eslint-disable-next-line no-param-reassign
    rule.use = replacementUse;
  });
};

module.exports = {
  injectExtractLoader,
  isIgnoreLoader,
  replaceIgnoreLoaderForScss,
};
