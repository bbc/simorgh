const { writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');
const { join, dirname } = require('path');

const PLUGIN_NAME = 'DevCssExtractPlugin';
const OUTPUT_FILE = 'build/dev-css-modules.css';
const CACHE_FILE = 'build/dev-css-modules-cache.json';

const CSS_CONTENT_REGEX = /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/s;

const extractCssFromModule = mod => {
  const resource = mod.resource || mod.userRequest || '';
  if (!resource || !/\.(scss|css)$/.test(resource)) return null;
  // eslint-disable-next-line no-underscore-dangle
  const sourceValue = mod._source?._value || '';
  if (!sourceValue.includes('___CSS_LOADER_EXPORT___')) return null;

  const match = sourceValue.match(CSS_CONTENT_REGEX);
  if (!match) return null;

  return match[1]
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
};

class DevCssExtractPlugin {
  constructor() {
    this.cssMap = new Map();
  }

  apply(compiler) {
    const outputPath = join(compiler.context, OUTPUT_FILE);
    const cachePath = join(compiler.context, CACHE_FILE);

    if (existsSync(cachePath)) {
      try {
        const cachedEntries = JSON.parse(readFileSync(cachePath, 'utf-8'));
        if (Array.isArray(cachedEntries)) {
          this.cssMap = new Map(cachedEntries);
        }
      } catch {
        this.cssMap = new Map();
      }
    }

    const { cssMap } = this;

    compiler.hooks.afterCompile.tap(PLUGIN_NAME, compilation => {
      if (compiler.name === 'server') return;

      [...compilation.modules].forEach(mod => {
        const css = extractCssFromModule(mod);
        const resource = mod.resource || mod.userRequest || '';
        if (css) {
          cssMap.set(resource, css);
        }
      });

      if (cssMap.size === 0) return;

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(cachePath, JSON.stringify([...cssMap.entries()]), 'utf-8');
      writeFileSync(outputPath, [...cssMap.values()].join('\n'), 'utf-8');
    });
  }
}

module.exports = DevCssExtractPlugin;
