/* eslint-disable @typescript-eslint/ban-ts-comment */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // @ts-ignore
    return { ...initialProps, helmet: Helmet.renderStatic() };
  }

  render() {
    // @ts-ignore
    const { helmet } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const meta = helmet.meta.toComponent();
    const title = helmet.title.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const headScript = helmet.script.toComponent();

    return (
      <Html {...htmlAttrs}>
        <Head>
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
