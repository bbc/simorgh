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
import litePageTransform from '#server/utilities/litePageTransform';

type DocProps = { helmet: HelmetData; isApp: boolean; isLiteMode?: boolean };

// Styling used for Lite pages - consider moving to a separate file
const LITE_STYLES = `html{line-height:1.15;-webkit-text-size-adjust:100%;font-size:16px;font-family:-apple-system, BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;}body{margin:0}ul{padding-inline-start:1.25rem}ol{padding-inline-start:1.25rem;list-style-type:none;}.lite-header-brand-wrapper{background-color:#b80000; padding:0.625rem;display:flex;justify-content:space-between;align-items:center;}#brandSvgHeader,#brandSvgFooter{fill:white;height:1.5rem;}#topPage,#footer{display:flex;}main,aside,[data-e2e=related-content-heading],[data-e2e=top-stories-heading],[data-e2e=features-analysis-heading],[data-e2e=most-read]{padding:0 1.25rem;}.lite-footer{background-color:#b80000; padding:0.625rem;}[class*=visuallyHiddenText]{clip-path:inset(100%);clip rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;width:1px;margin:0;}.lite-nav-list{margin:0;padding:0.625rem;list-style-type:none; border-bottom:1px solid #E6E8EA;display:flex;flex-wrap:wrap;gap:0.625rem;}.lite-footer-copyright{padding-inline-start:0.625rem;}.most-read-list-item{display:flex;flex-direction:row;gap:0.625rem;margin-bottom:0.625rem;}`;

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');
    const isLiteRoute = isLitePath(ctx.asPath || '');
    const headers = ctx.req?.headers;

    const isLiteMode = isLiteRoute || headers?.['save-data'] === 'on';

    const helmet = Helmet.renderStatic();

    const { html: originalHtml } = initialProps;

    const {
      liteHtml,
      liteHelmetLinkTags,
      liteHelmetMetaTags,
      liteHelmetScriptTags,
    } = litePageTransform({
      html: initialProps.html,
      helmetLinkTags: helmet.link.toComponent(),
      helmetMetaTags: helmet.meta.toComponent(),
      helmetScriptTags: helmet.script.toComponent(),
    });

    initialProps.html = isLiteMode ? liteHtml : originalHtml;

    const litePageProps = {
      link: liteHelmetLinkTags,
      meta: liteHelmetMetaTags,
      script: liteHelmetScriptTags,
    };

    return { ...initialProps, litePageProps, helmet, isApp, isLiteMode };
  }

  render() {
    const { litePageProps, helmet, isApp, isLiteMode } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const meta = helmet.meta.toComponent();
    const title = helmet.title.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const headScript = helmet.script.toComponent();

    if (isLiteMode) {
      return (
        <Html {...htmlAttrs}>
          <head>
            {title}
            {litePageProps.link}
            {litePageProps.meta}
            {litePageProps.script}
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
