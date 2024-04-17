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
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';

type DocProps = {
  helmet: HelmetData;
  isApp: boolean;
  clientSideEnvVariables: EnvConfig;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmet: Helmet.renderStatic(),
      isApp,
    };
  }

  render() {
    const { helmet, isApp, clientSideEnvVariables } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const meta = helmet.meta.toComponent();
    const title = helmet.title.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const headScript = helmet.script.toComponent();

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
          {meta}
          {title}
          {helmetLinkTags}
          {headScript}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
