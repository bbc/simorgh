const {
  writeFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} = require('fs');
const { join, dirname } = require('path');

const PLUGIN_NAME = 'DevCssExtractPlugin';
const OUTPUT_FILE = 'build/dev-css-modules.css';
const CACHE_FILE = 'build/dev-css-modules-cache.json';

const CSS_CONTENT_REGEX = /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/s;
const CSS_CONTENT_GLOBAL_REGEX =
  /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/gs;

const decodeCss = css =>
  css
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

const extractCssFromModule = mod => {
  const resource = mod.resource || mod.userRequest || '';
  if (!resource || !/\.(scss|css)$/.test(resource)) return null;
  // eslint-disable-next-line no-underscore-dangle
  const sourceValue = mod._source?._value || '';
  if (!sourceValue.includes('___CSS_LOADER_EXPORT___')) return null;

  const match = sourceValue.match(CSS_CONTENT_REGEX);
  if (!match) return null;

  return decodeCss(match[1]);
};

const getJsFilesRecursively = dirPath => {
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath).flatMap(entry => {
    const absolutePath = join(dirPath, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      return getJsFilesRecursively(absolutePath);
    }

    return absolutePath.endsWith('.js') ? [absolutePath] : [];
  });
};

const extractCssFromBuildArtifacts = buildDevPath => {
  const jsFiles = getJsFilesRecursively(buildDevPath);

  return jsFiles.flatMap(filePath => {
    const source = readFileSync(filePath, 'utf-8');
    const matches = [...source.matchAll(CSS_CONTENT_GLOBAL_REGEX)];

    return matches.map((match, index) => [
      `${filePath}::${index}`,
      decodeCss(match[1]),
    ]);
  });
};

class DevCssExtractPlugin {
  constructor() {
    this.cssMap = new Map();
  }

  apply(compiler) {
    const outputPath = join(compiler.context, OUTPUT_FILE);
    const cachePath = join(compiler.context, CACHE_FILE);
    const buildDevPath = join(compiler.context, 'build/dev');

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
      [...compilation.modules].forEach(mod => {
        const css = extractCssFromModule(mod);
        const resource = mod.resource || mod.userRequest || '';
        if (css) {
          cssMap.set(resource, css);
        }
      });

      // In dev, first route render can happen before module sources include CSS payloads.
      // Fallback to scanning emitted JS chunks so AMP/Lite CSS exists on first load.
      if (cssMap.size === 0 || !existsSync(outputPath)) {
        extractCssFromBuildArtifacts(buildDevPath).forEach(([key, css]) => {
          if (css) {
            cssMap.set(key, css);
          }
        });
      }

      if (cssMap.size === 0) return;

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(cachePath, JSON.stringify([...cssMap.entries()]), 'utf-8');
      console.log(`[DevCssExtractPlugin] Wrote CSS cache to ${cachePath} with ${cssMap.size} entries`);
      writeFileSync(outputPath, [...cssMap.values()].join('\n'), 'utf-8');
      console.log(`[DevCssExtractPlugin] Wrote concatenated CSS to ${outputPath} (${[...cssMap.values()].join('\n').length} bytes)`);
    });
  }
}

module.exports = DevCssExtractPlugin;
