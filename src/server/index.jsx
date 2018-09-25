import React from 'react';
import express from 'express';
import { ServerUni, loadInitialData } from '@jtart/uni';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import expressStaticGzip from 'express-static-gzip';
import routes from '../app/routes';
import Document from '../app/components/Document';

/*
  Safely imports the assets manifest file that the 'RAZZLE_ASSETS_MANIFEST' does not exist.
  Maps through the manifest file and extracts the JavaScript URLs.
*/
const assets = [];
try {
  const assetManifest = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require, global-require
  const assetsManifestKeys = Object.keys(assetManifest);

  /*
    Loops through the asset manifest, extracts the JS URL out of each entry and injects them into the assets array, which is passed to render.
    Loops backwards as the client bundle is output first, but needs to be last
  */
  for (let i = assetsManifestKeys.length - 1; i >= 0; i -= 1) {
    const key = assetsManifestKeys[i];
    assets.push(assetManifest[key].js);
  }
} catch (error) {
  /* eslint-disable no-console */
  console.log(
    `Error parsing assets manifest. RAZZLE_ASSETS_MANIFEST = ${
      process.env.RAZZLE_ASSETS_MANIFEST
    }`,
  );
  /* eslint-enable no-console */
}

const getPublicDirectory = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.RAZZLE_PUBLIC_DIR
    : process.env.RAZZLE_PUBLIC_DIR_DEV;

const publicDirectory = getPublicDirectory();
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data/test';

const server = express();
server
  .disable('x-powered-by')
  .use('/data', express.static(dataFolderToRender))
  .use(
    expressStaticGzip(publicDirectory, {
      enableBrotli: true,
      orderPreference: ['br'],
    }),
  )
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
  .get('/*', async ({ url }, res) => {
    try {
      const sheet = new ServerStyleSheet();
      const data = await loadInitialData(url, routes);

      const app = renderToString(
        sheet.collectStyles(
          <ServerUni url={url} routes={routes} data={data} />,
        ),
      );

      const helmet = Helmet.renderStatic();

      const styleTags = sheet.getStyleElement();

      const doc = renderToStaticMarkup(
        <Document
          assets={assets}
          app={app}
          data={data}
          styleTags={styleTags}
          helmet={helmet}
        />,
      );

      res.send(`<!doctype html>${doc}`);
    } catch ({ message }) {
      res.status(404).send(message);
    }
  });

export default server;
