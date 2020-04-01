import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderToStringWithData } from 'react-isomorphic-data/ssr';
import { StaticRouter } from 'react-router-dom';
import { DataProvider, createDataClient } from 'react-isomorphic-data';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import SimorghApp from '#app/containers/App/App';
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
  const dataClient = createDataClient({
    initialCache: {},
    ssr: true,
  });

  const sheet = new ServerStyleSheet();

  const statsFile = path.resolve(
    `${__dirname}/public/loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );

  const extractor = new ChunkExtractor({ statsFile });

  const context = {};

  let app;

  try {
    app = await renderToStringWithData(
      extractor.collectChunks(
        sheet.collectStyles(
          <DataProvider client={dataClient}>
            <StaticRouter location={url}>
              <SimorghApp
                routes={routes}
                initialData={data}
                bbcOrigin={bbcOrigin}
              />
            </StaticRouter>
          </DataProvider>,
        ),
      ),
      dataClient,
    );
  } catch (err) {
    // what do we do if one of these API calls fail?
    // We could render the main content without most read, radio schedules etc.
    // Or as we're heavily cached is it best to respond with an error so
    // mozart doesn't cache that?
    console.log(err);
    throw err;
  }

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
      componentData={dataClient.cache}
      styleTags={getStyleTag(sheet, isAmp)}
      helmet={headHelmet}
      service={service}
      isAmp={isAmp}
    />,
  );

  return { html: `<!doctype html>${doc}`, redirectUrl: null };
};

export default renderDocument;
