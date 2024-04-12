import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

import React from 'react';
import { Helmet } from 'react-helmet';
import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';

import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';
import LiteRenderer from '#server/Document/LiteRenderer';
import { BaseRendererProps } from '#server/Document/types';

interface DocProps extends BaseRendererProps {
  isApp: boolean;
  isLite: boolean;
  clientSideEnvVariables: EnvConfig;
  path: string;
}

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const path = ctx.asPath || '';
    const isApp = isAppPath(path);
    const isLite = isLitePath(path);

    const initialProps = await Document.getInitialProps(ctx);

    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmetMetaTags,
      helmetLinkTags,
      helmetScriptTags,
      htmlAttrs,
      isApp,
      isLite,
      path,
      title,
    };
  }

  render() {
    const {
      clientSideEnvVariables,
      helmetLinkTags,
      helmetMetaTags,
      helmetScriptTags,
      htmlAttrs,
      html,
      isApp,
      isLite,
      path,
      title,
    } = this.props;

    switch (true) {
      case isLite:
        return (
          <LiteRenderer
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            html={html}
            htmlAttrs={htmlAttrs}
            title={title}
            url={path}
          />
        );
      default:
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
}
