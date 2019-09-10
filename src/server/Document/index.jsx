import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ServerApp } from '../../app/containers/App';

import { getStyleTag } from '../styles';
import DocumentComponent from './component';

const renderDocument = async ({
  bbcOrigin,
  data,
  isAmp,
  routes,
  service,
  url,
}) => {
  const sheet = new ServerStyleSheet();

  const statsFile = path.resolve(
    '/Users/mcmild07/dev/simorgh/build/public/loadable-stats.json',
  );

  const extractor = new ChunkExtractor({ statsFile });

  const app = renderToString(
    extractor.collectChunks(
      sheet.collectStyles(
        <ServerApp
          location={url}
          routes={routes}
          data={data}
          bbcOrigin={bbcOrigin}
          context={{}}
          service={service}
          isAmp={isAmp}
        />,
      ),
    ),
  );

  const scripts = extractor.getScriptElements();
  const headHelmet = Helmet.renderStatic();
  const doc = renderToStaticMarkup(
    <DocumentComponent
      scripts={scripts}
      app={app}
      data={data}
      styleTags={getStyleTag(sheet, isAmp)}
      helmet={headHelmet}
      service={service}
      isAmp={isAmp}
    />,
  );

  return `<!doctype html>${doc}`;
};

export default renderDocument;
