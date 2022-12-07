import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
