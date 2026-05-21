import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';

// CSS file paths differ depending on the environment:
//
// Production (yarn start):
//   - Server chdir's into build/standalone/ws-nextjs-app/
//   - Static CSS files are under public/_next/ (copied by copyStaticFiles build step)
//
// Development (yarn dev) and build-time:
//   - CSS chunks are written to build/ directory relative to project root
//
// We check both locations in order, so the same code handles all environments.
const CSS_SEARCH_ROOTS = ['public/_next', 'build'];

export const resolveCssFilePath = (file: string): string | null =>
  CSS_SEARCH_ROOTS.map(root => join(process.cwd(), root, file)).find(
    existsSync,
  ) ?? null;

export const readCssFiles = (files: string[]): string =>
  files
    .map(resolveCssFilePath)
    .filter((filePath): filePath is string => filePath !== null)
    .map(filePath => readFileSync(filePath, 'utf-8'))
    .join('');

const logger = nodeLogger(__filename);

/**
 * Returns CSS for static page dependencies from Next.js's built-in build-manifest.json.
 *
 * build-manifest.json maps every page route to the exact JS and CSS files it requires,
 * including shared app-level chunks (/_app). This is the same data Next.js uses to
 * inject <link> tags for canonical pages, repurposed here for AMP/Lite inlining.
 *
 * NOTE: Next.js only lists CSS in build-manifest.json when it is statically associated
 * with a page entry point (e.g. a global CSS import in _app.tsx). In this project all
 * CSS is currently emitted via next/dynamic / react-loadable, so it appears in
 * react-loadable-manifest.json instead and this function returns '' for every request.
 * It is retained as a safety net for any future statically-imported CSS.
 */
export const getBuildManifestCss = (page: string): string => {
  const manifestPath = join(process.cwd(), 'build/build-manifest.json');
  if (!existsSync(manifestPath)) return '';

  try {
    const manifest: { pages: Record<string, string[]> } = JSON.parse(
      readFileSync(manifestPath, 'utf-8'),
    );

    const cssFiles = [
      ...new Set(
        [
          ...(manifest.pages?.['/_app'] ?? []),
          ...(manifest.pages?.[page] ?? []),
        ].filter(f => f.endsWith('.css')),
      ),
    ];

    return readCssFiles(cssFiles);
  } catch (e) {
    logger.error(logCodes.BUILD_MANIFEST_CSS_READ_ERROR, {
      event: 'build_manifest_css_read_error',
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return '';
  }
};

/**
 * Returns CSS from dynamic imports resolved via the react-loadable manifest.
 *
 * next/dynamic components can vary per-request based on page data (e.g. a media
 * player only rendered when an article contains video), so they cannot be statically
 * known from the page route alone and are not captured in build-manifest.json.
 */
export const getDynamicImportCss = (
  dynamicIds: Array<string | number>,
): string => {
  if (!dynamicIds.length) return '';

  const manifestPath = join(
    process.cwd(),
    'build/react-loadable-manifest.json',
  );

  if (!existsSync(manifestPath)) return '';

  try {
    const manifest: Record<string, { id: number; files: string[] }> =
      JSON.parse(readFileSync(manifestPath, 'utf-8'));

    const dynamicIdSet = new Set(dynamicIds.map(String));

    const cssFiles = [
      ...new Set(
        Object.entries(manifest)
          .filter(
            ([chunkKey, chunk]) =>
              dynamicIdSet.has(chunkKey) || dynamicIdSet.has(String(chunk.id)),
          )
          .flatMap(([, chunk]) => chunk.files.filter(f => f.endsWith('.css'))),
      ),
    ];

    return readCssFiles(cssFiles);
  } catch (e) {
    logger.error(logCodes.BUILD_MANIFEST_CSS_READ_ERROR, {
      event: 'dynamic_import_css_read_error',
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return '';
  }
};

/**
 * Returns CSS to inline for AMP/Lite SSR.
 *
 * Development:
 * - Inline all extracted CSS from dev-css-modules.css to avoid missing styles during HMR.
 *
 * Production:
 * - Inline static page CSS from build-manifest.json (/_app + current page route).
 * - Plus runtime dynamic import CSS from react-loadable-manifest.json.
 */
const getAmpLiteCss = ({
  page,
  dynamicIds,
}: {
  page: string;
  dynamicIds: Array<string | number>;
}): string => {
  const isProd = process.env.NODE_ENV === 'production';
  const devCssPath = join(process.cwd(), 'build/dev-css-modules.css');

  if (!isProd) {
    return existsSync(devCssPath) ? readFileSync(devCssPath, 'utf-8') : '';
  }

  return getBuildManifestCss(page) + getDynamicImportCss(dynamicIds);
};

export default getAmpLiteCss;
