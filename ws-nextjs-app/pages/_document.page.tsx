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

type DocProps = { helmet: HelmetData; isApp: boolean };

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isApp = isAppPath(ctx.asPath || '');

    return { ...initialProps, helmet: Helmet.renderStatic(), isApp };
  }

  render() {
    const { helmet, isApp } = this.props;

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
