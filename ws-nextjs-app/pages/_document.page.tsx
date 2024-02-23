import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import * as React from 'react';
import { Helmet, HelmetData } from 'react-helmet';
import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import litePageTransform, {
  LITE_STYLES,
} from '#server/utilities/litePageTransform';

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
};

// Styling used for Lite pages - consider moving to a separate file

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');
    const isLiteRoute = isLitePath(ctx.asPath || '');
    const headers = ctx.req?.headers;

    const isLiteMode = isLiteRoute || headers?.['save-data'] === 'on';

    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    const { html: originalHtml } = initialProps;

    const {
      liteHtml,
      liteHelmetLinkTags,
      liteHelmetMetaTags,
      liteHelmetScriptTags,
    } = litePageTransform({
      html: initialProps.html,
      helmetLinkTags: helmetLinkTags as unknown as React.ReactElement[],
      helmetMetaTags: helmetMetaTags as unknown as React.ReactElement[],
      helmetScriptTags: helmetScriptTags as unknown as React.ReactElement[],
    });

    initialProps.html = isLiteMode ? liteHtml : originalHtml;

    const helmetProps = {
      htmlAttrs,
      title,
      helmetMetaTags: isLiteMode ? liteHelmetMetaTags : helmetMetaTags,
      helmetLinkTags: isLiteMode ? liteHelmetLinkTags : helmetLinkTags,
      helmetScriptTags: isLiteMode ? liteHelmetScriptTags : helmetScriptTags,
    };

    return { ...initialProps, helmetProps, isApp, isLiteMode };
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
    } = this.props;

    if (isLiteMode) {
      return (
        <Html {...htmlAttrs}>
          <head>
            {title}
            {helmetLinkTags}
            {helmetMetaTags}
            {helmetScriptTags}
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
