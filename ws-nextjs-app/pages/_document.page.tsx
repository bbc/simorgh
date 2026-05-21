/* eslint-disable react/no-danger */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

import { HTMLAttributes, ReactElement } from 'react';
import { Helmet, HelmetData } from 'react-helmet';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';

import NO_JS_CLASSNAME from '#app/lib/noJs.const';

import getPathExtension from '#app/utilities/getPathExtension';
import CanonicalToLiteRedirect from '#utilities/CanonicalToLiteRedirect';
import addOperaMiniClassScript from '#app/lib/utilities/addOperaMiniClassScript';
import handleServerLogging from '#utilities/handleServerLogging';
import ComponentTracking from '../renderers/ComponentTracking';
import ReverbTemplate from '../renderers/ReverbTemplate';
import litePageTransforms from '../renderers/litePageTransforms';
import LiteRenderer from '../renderers/LiteRenderer';
import AmpRenderer from '../renderers/AmpRenderer';
import derivePageType from '../utilities/derivePageType';

type DocProps = {
  clientSideEnvVariables: EnvConfig;
  css: string;
  helmet: HelmetData;
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  ids: string[];
  pageType: string;
  isAmp: boolean;
  isApp: boolean;
  isLite: boolean;
  title: ReactElement;
};

// In standalone mode (`yarn start`), the server chdir's into build/standalone/ws-nextjs-app/
// and static files are copied there under public/_next/ by the copyStaticFiles build step.
// In a standard build, static files remain under build/ relative to the project root.
// We try both locations so the same code works in both environments.
const CSS_SEARCH_ROOTS = ['public/_next', 'build'];

const resolveCssFilePath = (file: string): string | null =>
  CSS_SEARCH_ROOTS.map(root => join(process.cwd(), root, file)).find(
    existsSync,
  ) ?? null;

const readCssFiles = (files: string[]): string =>
  files
    .map(resolveCssFilePath)
    .filter((filePath): filePath is string => filePath !== null)
    .map(filePath => readFileSync(filePath, 'utf-8'))
    .join('');

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
const logger = nodeLogger(__filename);
const getBuildManifestCss = (page: string): string => {
  const manifestPath = join(process.cwd(), 'build/build-manifest.json');
  if (!existsSync(manifestPath)) return '';

  try {
    const manifest: Record<string, { pages: Record<string, string[]> }> =
      JSON.parse(readFileSync(manifestPath, 'utf-8'));

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
const getDynamicImportCss = (dynamicIds: Array<string | number>): string => {
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
  } catch {
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

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const url = ctx.asPath || '';
    const pageType = derivePageType(url);

    const { isApp, isAmp, isLite } = getPathExtension(url);

    const cache = createCache({ key: 'css' });
    const { extractCritical } = createEmotionServer(cache);

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    if (isLite) {
      initialProps.html = litePageTransforms(initialProps.html);
    }

    const { css, ids } = extractCritical(initialProps.html);

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    handleServerLogging({ ctx, pageType });

    return {
      ...initialProps,
      clientSideEnvVariables,
      css,
      helmet: Helmet.renderStatic(),
      ids,
      pageType,
      isAmp,
      isApp,
      isLite,
    };
  }

  render() {
    const {
      clientSideEnvVariables,
      css,
      helmet,
      ids,
      pageType,
      isAmp,
      isApp,
      isLite,
    } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    type NextDataProps = { page: string; dynamicIds?: Array<string | number> };
    type PropsWithNextData = typeof this.props & {
      // eslint-disable-next-line no-underscore-dangle
      __NEXT_DATA__?: NextDataProps;
    };

    const getNextData = () => {
      /* eslint-disable no-underscore-dangle */
      const nextData = (this.props as PropsWithNextData).__NEXT_DATA__;
      /* eslint-enable no-underscore-dangle */
      return {
        page: nextData?.page ?? '',
        dynamicIds: nextData?.dynamicIds ?? [],
      };
    };

    switch (true) {
      case isAmp: {
        const ampCss = css + getAmpLiteCss(getNextData());
        return (
          <AmpRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            ids={ids}
            styles={ampCss}
            title={title}
          />
        );
      }
      case isLite: {
        const liteCss = css + getAmpLiteCss(getNextData());
        return (
          <LiteRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            styles={liteCss}
            title={title}
          />
        );
      }
      default:
        return (
          <Html lang="en-GB" {...htmlAttrs} className={NO_JS_CLASSNAME}>
            <Head>
              <CanonicalToLiteRedirect />
              <ReverbTemplate />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `document.documentElement.classList.remove("no-js");`,
                }}
              />
              {addOperaMiniClassScript()}
              <Script strategy="beforeInteractive">
                {`window.SIMORGH_ENV_VARS=${JSON.stringify(clientSideEnvVariables)}`}
              </Script>
              {pageType === 'live' && (
                <script src="https://www.riddle.com/embed/build-embedjs/embedV2.js" />
              )}
              {isApp && <meta name="robots" content="noindex" />}
              {title}
              {helmetMetaTags}
              {helmetLinkTags}
              <ComponentTracking
                trackComponentViews={false}
                enableStaticClickTrackingOnOperaMiniOnly
              />
              {helmetScriptTags}
              <style
                data-emotion={ids.join(' ')}
                dangerouslySetInnerHTML={{ __html: css }}
              />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
    }
  }
}
