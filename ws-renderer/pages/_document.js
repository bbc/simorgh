import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { renderStatic } from '../shared/renderer';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';
export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, ids } = await renderStatic(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    };
  }

  render() {
    const statsFile = path.resolve('.next/loadable-stats.json');

    const chunkExtractor = new ChunkExtractor({
      statsFile: statsFile,
    });

    return chunkExtractor.collectChunks(
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>,
    );
  }
}
