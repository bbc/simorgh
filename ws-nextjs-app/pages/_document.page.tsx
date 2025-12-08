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

import AmpRenderer from '#server/Document/Renderers/AmpRenderer';
import LiteRenderer from '#server/Document/Renderers/LiteRenderer';
import litePageTransforms from '#server/Document/Renderers/litePageTransforms';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';

import nodeLogger from '#lib/logger.node';
import {
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
} from '#lib/logger.const';
import { OK, INTERNAL_SERVER_ERROR } from '#app/lib/statusCodes.const';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

import getPathExtension from '#app/utilities/getPathExtension';
import ReverbTemplate from '#src/server/Document/Renderers/ReverbTemplate';
import { PageTypes } from '#app/models/types/global';
import ComponentTracking from '#src/server/Document/Renderers/ComponentTracking';
import addOperaMiniClassScript from '#app/lib/utilities/addOperaMiniClassScript';
import removeSensitiveHeaders from '../utilities/removeSensitiveHeaders';
import derivePageType from '../utilities/derivePageType';

const logger = nodeLogger(__filename);

const handleServerLogging = ({
  ctx,
  pageType,
}: {
  ctx: DocumentContext;
  pageType: PageTypes | 'Unknown';
}) => {
  const url = ctx.asPath || '';
  const headers = removeSensitiveHeaders(ctx.req?.headers);
  const { statusCode } = ctx.res || {};
  const { cause, message, name, stack } = ctx.err || {};

  switch (statusCode) {
    case OK:
      logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
        url,
        headers,
        pageType,
      });
      break;
    case INTERNAL_SERVER_ERROR:
      sendCustomMetric({
        metricName: NON_200_RESPONSE,
        statusCode,
        pageType,
        requestUrl: url,
      });
      logger.error(SERVER_SIDE_REQUEST_FAILED, {
        status: INTERNAL_SERVER_ERROR,
        message: { cause, message, name, stack, url },
        url,
        headers,
        pageType,
      });
      break;
    default:
      break;
  }
};

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

    switch (true) {
      case isAmp && pageType === 'article':
        return (
          <AmpRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            ids={ids}
            styles={css}
            title={title}
          />
        );
      case isLite:
        return (
          <LiteRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            styles={css}
            title={title}
          />
        );
      default:
        return (
          <Html lang="en-GB" {...htmlAttrs} className={NO_JS_CLASSNAME}>
            <Head>
              <ReverbTemplate />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `document.documentElement.classList.remove("no-js");`,
                }}
              />
              {/* <script
                dangerouslySetInnerHTML={{
                  __html: `
                    // Detect standalone PWA mode
                      const isStandalone =
                        window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true ||
                        window.matchMedia(
                            '(display-mode: minimal-ui)',
                          ).matches ||
                          window.matchMedia(
                            '(display-mode: fullscreen)',
                          ).matches ||
                          window.matchMedia(
                            '(display-mode: window-controls-overlay)',
                          ).matches;

                      // Send PWA status to SW as early as possible
                      function sendPWAStatus() {
                        if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
                        console.log('Sending PWA status to SW', isStandalone);
                        navigator.serviceWorker.controller.postMessage({
                          type: 'PWA_STATUS',
                          isPWA: isStandalone
                        });
                      }

                      // When SW takes control (first install), send PWA_STATUS
                      if (navigator.serviceWorker) {
                        navigator.serviceWorker.addEventListener('controllerchange', () => {
                          sendPWAStatus();

                          // ---- One-time Auto Refresh for Installed PWA ----
                          // Ensures offline pages cache on first install
                          if (isStandalone && !sessionStorage.getItem('pwa-refreshed')) {
                          console.log('PWA first install - refreshing to cache offline pages');
                            sessionStorage.setItem('pwa-refreshed', 'yes');
                            window.location.reload();
                          }
                        });
                      }
                        `,
                }}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function() {
                        const isStandalone =
                          window.matchMedia('(display-mode: standalone)').matches ||
                          navigator.standalone === true;

                        if (!isStandalone) return;

                        // Only reload ONCE if SW is not controlling
                        if (!sessionStorage.getItem('pwa-sw-reload')) {
                          if (!navigator.serviceWorker.controller) {
                            sessionStorage.setItem('pwa-sw-reload', 'true');
                            window.location.reload();
                          }
                        }
                      })();`,
                }}
              /> */}

              {addOperaMiniClassScript()}
              <Script strategy="beforeInteractive">
                {`window.SIMORGH_ENV_VARS=${JSON.stringify(clientSideEnvVariables)}`}
              </Script>
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
