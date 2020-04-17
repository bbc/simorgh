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
    `${__dirname}/public/loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );

  const extractor = new ChunkExtractor({ statsFile });

  const context = {};

  const app = renderToString(
    extractor.collectChunks(
      sheet.collectStyles(
        <ServerApp
          location={url}
          routes={routes}
          data={data}
          bbcOrigin={bbcOrigin}
          context={context}
          service={service}
          isAmp={isAmp}
        />,
      ),
    ),
  );

  if (context.url) {
    /**
     * React Router automatically adds an url property with the
     * redirected url to the context object when a Redirect component
     * is used - https://alligator.io/react/react-router-ssr/
     */
    return { redirectUrl: context.url, html: null };
  }

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

  return { html: `<!doctype html>${doc}`, redirectUrl: null };
};

export default renderDocument;
