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
import nodeLogger from '#lib/logger.node';
import {
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
} from '#lib/logger.const';
import { OK, INTERNAL_SERVER_ERROR } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import removeSensitiveHeaders from '../utilities/removeSensitiveHeaders';
import derivePageType from '../utilities/derivePageType';

const logger = nodeLogger(__filename);

const handleServerLogging = (ctx: DocumentContext) => {
  const url = ctx.asPath || '';
  const headers = removeSensitiveHeaders(ctx.req?.headers);
  const pageType = derivePageType(url);
  const { statusCode } = ctx.res || {};

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
        message: ctx.res?.statusMessage,
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
  helmet: HelmetData;
  isApp: boolean;
  clientSideEnvVariables: EnvConfig;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const url = ctx.asPath || '';
    const isApp = isAppPath(url);

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    handleServerLogging(ctx);

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
