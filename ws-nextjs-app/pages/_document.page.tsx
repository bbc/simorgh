import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

import React, { HTMLAttributes, ReactElement } from 'react';
import { Helmet, HelmetData } from 'react-helmet';

import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';
import LiteRenderer from '#server/Document/Renderers/LiteRenderer';

type DocProps = {
  clientSideEnvVariables: EnvConfig;
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  title: ReactElement;
  helmet: HelmetData;
  isApp: boolean;
  isLite: boolean;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const url = ctx.asPath || '';
    const isApp = isAppPath(url);
    const isLite = isLitePath(url);

    const initialProps = await Document.getInitialProps(ctx);

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmet: Helmet.renderStatic(),
      isApp,
      isLite,
    };
  }

  render() {
    const { clientSideEnvVariables, helmet, isApp, isLite } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    switch (true) {
      case isLite:
        return (
          <LiteRenderer
            bodyContent={<Main />}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            title={title}
            isNextJs
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
                {`window.SIMORGH_ENV_VARS=${JSON.stringify(clientSideEnvVariables)}`}
              </Script>
              {isApp && <meta name="robots" content="noindex" />}
              {title}
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
