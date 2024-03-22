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
import isAmpPath from '#app/routes/utils/isAmpPath';
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';

import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { AMP_GEO_SCRIPT } from '#components/AmpGeo';

type DocProps = {
  helmet: HelmetData;
  isApp: boolean;
  isAmp: boolean;
  clientSideEnvVariables: EnvConfig;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');
    const isAmp = isAmpPath(ctx.asPath || '');

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmet: Helmet.renderStatic(),
      isApp,
      isAmp,
    };
  }

  render() {
    const { helmet, isApp, isAmp, clientSideEnvVariables } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const meta = helmet.meta.toComponent();
    const title = helmet.title.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const headScript = helmet.script.toComponent();

    if (isAmp) {
      return (
        <Html {...htmlAttrs}>
          <head>
            {title}
            {helmetLinkTags}
            {meta}
            {headScript}
            {isAmp && (
              <>
                <style amp-boilerplate="">{AMP_SCRIPT}</style>
                <noscript>
                  <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
                </noscript>
                {AMP_JS}
                {AMP_GEO_SCRIPT}
                {AMP_CONSENT_JS}
                {AMP_ANALYTICS_JS}
              </>
            )}
          </head>
          <body className="amp-geo-pending">
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
