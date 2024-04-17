import Document, { DocumentContext } from 'next/document';

import React, { HTMLAttributes, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import litePageTransform from '#server/utilities/litePageTransform';
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';
import nodeLogger from '#lib/logger.node';
import { LITE_PAGE_TRANSFORMATION_FAILED } from '#app/lib/logger.const';
import CanonicalRenderer from '../Renderers/CanonicalRenderer';
import LiteRenderer from '../Renderers/LiteRenderer';

const logger = nodeLogger(__filename);

type DocProps = {
  clientSideEnvVariables: EnvConfig;
  helmetProps: {
    htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
    title: ReactElement;
    helmetMetaTags: ReactElement;
    helmetLinkTags: ReactElement;
    helmetScriptTags: ReactElement;
  };
  isApp: boolean;
  isLite: boolean;
  liteStyleTag: ReactElement;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const url = ctx.asPath || '';
    const isApp = isAppPath(url);
    const isLite = isLitePath(url);
    const cache = createCache({ key: 'bbc' });
    const { extractCritical } = createEmotionServer(cache);

    if (isLite) {
      const originalRenderPage = ctx.renderPage;
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => (
            <CacheProvider value={cache}>
              <App {...props} />
            </CacheProvider>
          ),
        });
    }

    const initialProps = await Document.getInitialProps(ctx);

    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    const helmetProps = {
      htmlAttrs,
      title,
      helmetMetaTags,
      helmetLinkTags,
      helmetScriptTags,
    };

    let liteStyleTag;

    if (isLite) {
      try {
        const {
          liteHtml,
          liteHelmetLinkTags,
          liteHelmetMetaTags,
          liteHelmetScriptTags,
        } = litePageTransform({
          html: initialProps.html,
          helmetLinkTags,
          helmetMetaTags,
          helmetScriptTags,
        });

        initialProps.html = liteHtml;

        const { css } = extractCritical(initialProps.html);

        liteStyleTag = <style>{css}</style>;

        helmetProps.helmetMetaTags = liteHelmetMetaTags;
        helmetProps.helmetLinkTags = liteHelmetLinkTags;
        helmetProps.helmetScriptTags = liteHelmetScriptTags;
      } catch (error: unknown) {
        const { message } = error as Error;
        logger.error(LITE_PAGE_TRANSFORMATION_FAILED, {
          message,
          url: ctx.asPath,
        });
      }
    }

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmetProps,
      isApp,
      isLite,
      liteStyleTag,
    };
  }

  render() {
    const {
      clientSideEnvVariables,
      helmetProps: {
        htmlAttrs,
        title,
        helmetLinkTags,
        helmetMetaTags,
        helmetScriptTags,
      },
      html,
      isApp,
      isLite,
      liteStyleTag,
    } = this.props;

    switch (true) {
      case isLite:
        return (
          <LiteRenderer
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            title={title}
            html={html}
            styles={liteStyleTag}
          />
        );
      default:
        return (
          <CanonicalRenderer
            clientSideEnvVariables={clientSideEnvVariables}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            isApp={isApp}
            title={title}
            html={html}
          />
        );
    }
  }
}
