/* eslint-disable no-console */
// Spike: builds a standalone Resonance bundle for lite pages and reports its size.
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const outputFile = join(repoRoot, 'public/spike/resonance-lite.js');

const entry = `
import { Resonance } from '@bbc/resonance';
window.__Resonance = Resonance;
`;

const targets = {
  es2020: ['es2020'],
  legacy: ['es2016'],
};

const formatKB = bytes => `${(bytes / 1024).toFixed(2)} KB`;

const bundle = async target => {
  const { outputFiles } = await build({
    stdin: { contents: entry, resolveDir: repoRoot, loader: 'js' },
    bundle: true,
    minify: true,
    format: 'iife',
    platform: 'browser',
    target: targets[target],
    write: false,
    legalComments: 'none',
    logLevel: 'silent',
  });

  return Buffer.from(outputFiles[0].contents);
};

const sizes = code => ({
  raw: code.length,
  gzip: gzipSync(code, { level: 6 }).length,
  brotli: brotliCompressSync(code, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length,
});

const servedTarget = process.argv.includes('--target=es2020')
  ? 'es2020'
  : 'legacy';

const results = [];

for (const target of Object.keys(targets)) {
  try {
    const code = await bundle(target);
    results.push({ target, ...sizes(code), code });
  } catch (error) {
    console.error(`Failed to build "${target}" target: ${error.message}`);
  }
}

console.table(
  results.map(({ target, raw, gzip, brotli }) => ({
    target,
    raw: formatKB(raw),
    'gzip (level 6)': formatKB(gzip),
    'brotli (q11)': formatKB(brotli),
  })),
);

const served = results.find(({ target }) => target === servedTarget);

if (!served) {
  console.error(`No bundle built for "${servedTarget}", nothing written.`);
  process.exit(1);
}

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, served.code);
console.log(`Wrote "${servedTarget}" bundle to ${outputFile}`);
