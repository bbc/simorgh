import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';

/**
 * Public API for this module: getAmpLiteCss (default export)
 *
 * Returns CSS to inline for AMP/Lite SSR.
 * Helper functions below are implementation details exported only for testing.
 */

// CSS file paths differ depending on the environment:
//
// Production (yarn start):
//   - Server chdir's into build/standalone/ws-nextjs-app/
//   - Static CSS files are under public/_next/ (copied by all build scripts via copyStaticFiles)
//
// Development (yarn dev) and build-time:
//   - CSS chunks are written to build/ directory relative to project root
//
// We check both locations in order, so the same code handles all environments.
const CSS_SEARCH_ROOTS = ['public/_next', 'build'];

const resolveCssFilePath = (file: string): string | null =>
  CSS_SEARCH_ROOTS.map(root => join(process.cwd(), root, file)).find(
    existsSync,
  ) ?? null;

const logger = nodeLogger(__filename);

type BuildManifest = { pages: Record<string, string[]> };
type LoadableManifest = Record<string, { id: number; files: string[] }>;

// Manifest cache keyed by absolute file path. Manifests are static in production
// (never change at runtime), so parsing once and caching avoids repeated readFileSync
// + JSON.parse on every AMP/Lite request.
const manifestCache = new Map<string, BuildManifest | LoadableManifest>();

// CSS file content cache keyed by resolved absolute file path. CSS chunk files are
// also static after build, so caching their contents avoids repeated synchronous
// disk reads for the same chunk on every AMP/Lite request.
const cssFileCache = new Map<string, string>();

const safeReadFile = (filePath: string, logCode: string): string | null => {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (e) {
    logger.error(logCode, {
      file: filePath,
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return null;
  }
};

const readCssFiles = (files: string[], logCode: string): string =>
  files.reduce((css, file) => {
    const filePath = resolveCssFilePath(file);

    if (filePath === null) {
      logger.warn(logCode, {
        file,
        rootsChecked: CSS_SEARCH_ROOTS.map(root =>
          join(process.cwd(), root, file),
        ),
      });
      return css;
    }

    if (cssFileCache.has(filePath)) {
      return css + (cssFileCache.get(filePath) ?? '');
    }

    const content = safeReadFile(filePath, logCode);
    if (content !== null) {
      cssFileCache.set(filePath, content);
      return css + content;
    }
    return css;
  }, '');

const loadManifest = <T extends BuildManifest | LoadableManifest>(
  manifestPath: string,
  errorCode: string,
): T | null => {
  if (manifestCache.has(manifestPath))
    return manifestCache.get(manifestPath) as T;

  if (!existsSync(manifestPath)) return null;

  const content = safeReadFile(manifestPath, errorCode);
  if (content === null) return null;

  try {
    const parsed: T = JSON.parse(content);
    manifestCache.set(manifestPath, parsed);
    return parsed;
  } catch (e) {
    logger.error(errorCode, {
      event: errorCode,
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return null;
  }
};

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
const getBuildManifestCss = (page: string): string => {
  const manifest = loadManifest<BuildManifest>(
    join(process.cwd(), 'build/build-manifest.json'),
    logCodes.BUILD_MANIFEST_CSS_READ_ERROR,
  );
  if (!manifest) return '';

  const cssFiles = [
    ...new Set(
      [
        ...(manifest.pages?.['/_app'] ?? []),
        ...(manifest.pages?.[page] ?? []),
      ].filter(f => f.endsWith('.css')),
    ),
  ];

  return readCssFiles(cssFiles, logCodes.BUILD_MANIFEST_CSS_READ_ERROR);
};

/**
 * Returns CSS from dynamic imports resolved via the react-loadable manifest.
 *
 * next/dynamic components can vary per-request based on page data (e.g. a media
 * player only rendered when an article contains video), so they cannot be statically
 * known from the page route alone and are not captured in build-manifest.json.
 */
const getDynamicImportCss = (dynamicIds: Array<string | number>): string => {
  if (!dynamicIds.length) return '';

  const manifest = loadManifest<LoadableManifest>(
    join(process.cwd(), 'build/react-loadable-manifest.json'),
    logCodes.DYNAMIC_IMPORT_CSS_READ_ERROR,
  );
  if (!manifest) return '';

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

  return readCssFiles(cssFiles, logCodes.DYNAMIC_IMPORT_CSS_READ_ERROR);
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
    if (!existsSync(devCssPath)) {
      logger.warn(logCodes.BUILD_MANIFEST_CSS_READ_ERROR, {
        message:
          'Dev CSS file not found. AMP/Lite pages may be missing styles. Try deleting the build directory and restarting your dev server.',
        path: devCssPath,
      });
      return '';
    }
    return (
      safeReadFile(devCssPath, logCodes.BUILD_MANIFEST_CSS_READ_ERROR) ?? ''
    );
  }

  return getBuildManifestCss(page) + getDynamicImportCss(dynamicIds);
};

export default getAmpLiteCss;

// Internal helpers exported only for testing purposes.
// The public API is the default export (getAmpLiteCss).
export const resetManifestCaches = (): void => {
  manifestCache.clear();
  cssFileCache.clear();
};

export {
  resolveCssFilePath,
  readCssFiles,
  getBuildManifestCss,
  getDynamicImportCss,
};
