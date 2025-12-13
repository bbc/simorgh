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

import NO_JS_CLASSNAME from '#app/lib/noJs.const';

import getPathExtension from '#app/utilities/getPathExtension';
import ReverbTemplate from '#src/server/Document/Renderers/ReverbTemplate';
import ComponentTracking from '#src/server/Document/Renderers/ComponentTracking';
import addOperaMiniClassScript from '#app/lib/utilities/addOperaMiniClassScript';
import handleServerLogging from '#nextjs/utilities/handleServerLogging';
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
