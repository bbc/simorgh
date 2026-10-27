const { writeFileSync, mkdirSync } = require('fs');
const { join, dirname } = require('path');

const OUTPUT_FILE = 'build/dev-css-modules.css';

// css-loader outputs JS modules where the CSS string is embedded in a .push() call:
//   ___CSS_LOADER_EXPORT___.push([module.id, ".Subhead_h2__K8gJ6 { color: orange; }", ""]);
// The class names in this string are already hashed by css-loader, so this is the
// correct point in the chain to extract CSS for AMP/Lite SSR injection.
// Extracting before css-loader (e.g. after sass-loader) would yield un-scoped class
// names that don't match any elements in the DOM.
const CSS_CONTENT_REGEX = /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/s;

// Module-level map persists in memory across HMR rebuilds within the same process.
// On each HMR rebuild only changed CSS files are reprocessed, so CSS from unchanged
// files is retained here without needing a cache file on disk.
const cssMap = new Map();

// This loader runs after css-loader (positioned before it in the webpack use array).
// It receives css-loader's JS output, extracts the CSS string with hashed class names,
// stores it in the in-memory map, writes the concatenated output to disk, then passes
// the JS through unchanged for the remaining loaders.
module.exports = function devCssExtractLoader(jsSource) {
  const match = jsSource.match(CSS_CONTENT_REGEX);
  if (match) {
    const css = JSON.parse(`"${match[1]}"`);
    cssMap.set(this.resourcePath, css);

    const outputPath = join(this.rootContext, OUTPUT_FILE);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, [...cssMap.values()].join('\n'), 'utf-8');
  }

  return jsSource;
};
