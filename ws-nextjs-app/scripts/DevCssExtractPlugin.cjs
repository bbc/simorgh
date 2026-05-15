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

const CSS_CONTENT_REGEX = /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/s;
const CSS_CONTENT_GLOBAL_REGEX =
  /\.push\(\[module\.id, "((?:[^"\\]|\\.)*)"[^)]*\)/gs;

const decodeCss = css => JSON.parse(`"${css}"`);

const extractCssFromModule = mod => {
  const resource = mod.resource || '';
  if (!resource || !/\.(scss|css)$/.test(resource)) return null;
  // Use the public source() API (webpack 5 Source interface) rather than the private _value
  // property. During HMR incremental rebuilds webpack wraps sources in CachedSource where
  // _value is undefined, causing extraction to silently fail and stale CSS to be written.
  // eslint-disable-next-line no-underscore-dangle
  const sourceValue = mod._source?.source?.() || mod._source?._value || '';
  if (typeof sourceValue !== 'string') return null;
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
    const buildDevPath = join(compiler.context, 'build/dev');
    const { cssMap } = this;

    compiler.hooks.afterCompile.tap(PLUGIN_NAME, compilation => {
      [...compilation.modules].forEach(mod => {
        const css = extractCssFromModule(mod);
        const resource = mod.resource || '';
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

      if (cssMap.size === 0) {
        return;
      }

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, [...cssMap.values()].join('\n'), 'utf-8');
    });
  }
}

module.exports = DevCssExtractPlugin;
