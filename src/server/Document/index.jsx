import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#app/containers/App';
import getAssetOrigins from '../utilities/getAssetOrigins';

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
    `${__dirname}/public/loadable-stats-${process.env.APP_ENV}.json`,
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

  const scripts = extractor.getScriptElements({
    crossOrigin: 'anonymous',
    type: 'text/javascript',
    defer: true,
  });
  const headHelmet = Helmet.renderStatic();
  const assetOrigins = getAssetOrigins(service);
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assetOrigins={assetOrigins}
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
