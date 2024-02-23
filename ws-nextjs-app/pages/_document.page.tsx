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
    let helmetMetaTags =
      helmet.meta.toComponent() as unknown as React.ReactElement[];
    let helmetLinkTags =
      helmet.link.toComponent() as unknown as React.ReactElement[];
    let helmetScriptTags =
      helmet.script.toComponent() as unknown as React.ReactElement[];

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
        helmetMetaTags = liteHelmetMetaTags;
        helmetLinkTags = liteHelmetLinkTags;
        helmetScriptTags = liteHelmetScriptTags;
      } catch (e) {
        // Bail out and return normal version on error
        return {
          ...initialProps,
          helmetProps: {
            htmlAttrs,
            title,
            helmetMetaTags,
            helmetLinkTags,
            helmetScriptTags,
          },
          isApp,
          isLiteMode: false,
        };
      }
    }

    const helmetProps = {
      htmlAttrs,
      title,
      helmetMetaTags,
      helmetLinkTags,
      helmetScriptTags,
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
