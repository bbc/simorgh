/* eslint-disable react/no-danger */
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
import getAmpLiteCss from '#utilities/getAmpLiteCss';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';
import { writeFileSync } from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { browserslist as targetBrowsers } from '../package.json';
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

const logger = nodeLogger(__filename);

// Removes vendor-prefixed CSS that isn't needed for the project's real target
// browsers (see `browserslist` in package.json), using Autoprefixer's own
// caniuse-backed compatibility data rather than a hand-rolled pattern match.
// This correctly keeps properties with no standard equivalent (e.g.
// `-webkit-overflow-scrolling`) regardless of target, since Autoprefixer only
// removes prefixes it knows are safe to remove for the given browser list.
const autoprefixerPlugin = autoprefixer({
  overrideBrowserslist: targetBrowsers,
  remove: true,
});

const optimiseCssPrefixes = (css: string): string => {
  try {
    return postcss([autoprefixerPlugin]).process(css, { from: undefined }).css;
  } catch (e) {
    logger.error(logCodes.AMP_LITE_CSS_AUTOPREFIXER_ERROR, {
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return css;
  }
};

const toKb = (value: string): number =>
  Math.round((Buffer.byteLength(value, 'utf8') / 1024) * 100) / 100;

// Temporary diagnostic: logs the byte size (KB) of each CSS source at the point
// they are combined, so we can assess how much the Emotion critical CSS vs the
// CSS Modules AMP/Lite output each contribute to the total inlined payload.
const logCssSizeMetric = ({
  variant,
  emotionCss,
  ampLiteCss,
  combinedCss,
  optimisedCss,
}: {
  variant: 'amp' | 'lite';
  emotionCss: string;
  ampLiteCss: string;
  combinedCss: string;
  optimisedCss?: string;
}): void => {
  logger.info(logCodes.AMP_LITE_CSS_SIZE_METRIC, {
    variant,
    emotionCssKb: toKb(emotionCss),
    ampLiteCssKb: toKb(ampLiteCss),
    combinedCssKb: toKb(combinedCss),
    ...(optimisedCss !== undefined && {
      optimisedCssKb: toKb(optimisedCss),
    }),
  });

  // Temporary diagnostic dump: writes the raw CSS sources to disk so they can be
  // inspected directly for minification and duplication. Never runs unless
  // DEBUG_DUMP_AMP_CSS=1 is explicitly set, so this has no effect in normal use.
  if (process.env.DEBUG_DUMP_AMP_CSS === '1') {
    writeFileSync(`/tmp/${variant}-emotion-css.css`, emotionCss);
    writeFileSync(`/tmp/${variant}-amp-lite-css.css`, ampLiteCss);
    writeFileSync(`/tmp/${variant}-combined-css.css`, combinedCss);
    if (optimisedCss !== undefined) {
      writeFileSync(`/tmp/${variant}-optimised-css.css`, optimisedCss);
    }
  }
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
      case isAmp && pageType === 'article': {
        const ampLiteCss = getAmpLiteCss(getNextData());
        const combinedCss = optimiseCssPrefixes(css + ampLiteCss);
        logCssSizeMetric({
          variant: 'amp',
          emotionCss: css,
          ampLiteCss,
          combinedCss,
        });
        return (
          <AmpRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            ids={ids}
            styles={combinedCss}
            title={title}
          />
        );
      }
      case isLite: {
        const ampLiteCss = getAmpLiteCss(getNextData());
        const liteCss = optimiseCssPrefixes(css + ampLiteCss);
        logCssSizeMetric({
          variant: 'lite',
          emotionCss: css,
          ampLiteCss,
          combinedCss: liteCss,
        });
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
