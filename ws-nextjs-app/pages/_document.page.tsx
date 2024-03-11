import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

import * as React from 'react';
import { Helmet, HelmetData } from 'react-helmet';
import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import litePageTransform, {
  LITE_STYLES,
} from '#server/utilities/litePageTransform';
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';

type DocProps = {
  helmetProps: {
    htmlAttrs: HelmetData['htmlAttributes'];
    title: React.ReactNode;
    helmetMetaTags: React.ReactNode;
    helmetLinkTags: React.ReactNode;
    helmetScriptTags: React.ReactNode;
  };
  isApp: boolean;
  isLiteMode?: boolean;
  clientSideEnvVariables: EnvConfig;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');
    const isLiteRoute = isLitePath(ctx.asPath || '');

    const isLiteMode = isLiteRoute;

    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags =
      helmet.meta.toComponent() as unknown as React.ReactElement[];
    const helmetLinkTags =
      helmet.link.toComponent() as unknown as React.ReactElement[];
    const helmetScriptTags =
      helmet.script.toComponent() as unknown as React.ReactElement[];

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    const helmetProps = {
      htmlAttrs,
      title,
      helmetMetaTags,
      helmetLinkTags,
      helmetScriptTags,
    };

    if (isLiteMode) {
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
        helmetProps.helmetMetaTags = liteHelmetMetaTags;
        helmetProps.helmetLinkTags = liteHelmetLinkTags;
        helmetProps.helmetScriptTags = liteHelmetScriptTags;
      } catch (e) {
        // Bail out and return normal version on error
        return {
          ...initialProps,
          helmetProps,
          clientSideEnvVariables,
          isApp,
          isLiteMode: false,
        };
      }
    }

    return {
      ...initialProps,
      helmetProps,
      clientSideEnvVariables,
      isApp,
      isLiteMode,
    };
  }

  render() {
    const {
      helmetProps: {
        htmlAttrs,
        title,
        helmetLinkTags,
        helmetMetaTags,
        helmetScriptTags,
      },
      isApp,
      isLiteMode,
      clientSideEnvVariables,
    } = this.props;

    if (isLiteMode) {
      return (
        <Html {...htmlAttrs}>
          <head>
            <script
              id="simorgh-envvars"
              type="text/javascript"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `window.SIMORGH_ENV_VARS=${JSON.stringify(
                  clientSideEnvVariables,
                )}`,
              }}
            />
            {title}
            {helmetLinkTags}
            {helmetMetaTags}
            {helmetScriptTags}

            <meta name="robots" content="noindex" />
            <style>{LITE_STYLES}</style>
          </head>
          <body>
            <Main />
          </body>
        </Html>
      );
    }

    return (
      <Html {...htmlAttrs} className="no-js">
        <Head>
          <script
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.remove("no-js");`,
            }}
          />
          <Script id="simorgh-envvars" strategy="beforeInteractive">
            {`window.SIMORGH_ENV_VARS=${JSON.stringify(
              clientSideEnvVariables,
            )}`}
          </Script>
          {isApp && <meta name="robots" content="noindex" />}
          {helmetMetaTags}
          {helmetLinkTags}
          {helmetScriptTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
