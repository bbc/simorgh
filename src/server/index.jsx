import React from 'react';
import express from 'express';
import { ServerApp, loadInitialData } from 'react-universal-app';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import fs from 'fs';
import path from 'path';
// not part of react-helmet
import helmet from 'helmet';
import gnuTP from 'gnu-terry-pratchett';
import dotenv from 'dotenv';
import routes, { articleRegexPath } from '../app/routes';
import { getStyleTag } from './styles';
import getAssetsArray from './assets';

import Document from '../app/components/Document';

const result = dotenv.config({
  path: `.env.${process.env.RUN_ENV || 'live'}`,
});

if (result.error) {
  throw result.error;
}

const assets = getAssetsArray();

const publicDirectory = process.env.SIMORGH_PUBLIC_DIR;
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data/test';

const articleDataRegexPath = `${articleRegexPath}.json`;

const server = express();
server
  .disable('x-powered-by')
  .use(compression())
  .use(helmet({ frameguard: { action: 'deny' } }))
  .use(
    expressStaticGzip(publicDirectory, {
      enableBrotli: true,
      orderPreference: ['br'],
    }),
  )
  .use(gnuTP())
  .get(articleDataRegexPath, async ({ params }, res) => {
    const { service, id } = params;

    const dataFilePath = path.join(
      dataFolderToRender,
      service,
      'articles',
      `${id}.json`,
    );

    fs.readFile(dataFilePath, (error, data) => {
      if (error) {
        res.sendStatus(404);
        console.log(error); // eslint-disable-line no-console
        return null;
      }

      const articleJSON = JSON.parse(data);

      res.setHeader('Content-Type', 'application/json');
      res.json(articleJSON);
      return null;
    });
  })
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
  .get('/*', async ({ url }, res) => {
    try {
      const sheet = new ServerStyleSheet();
      const data = await loadInitialData(url, routes);

      const app = renderToString(
        sheet.collectStyles(
          <ServerApp location={url} routes={routes} data={data} context={{}} />,
        ),
      );

      const headHelmet = Helmet.renderStatic();

      const doc = renderToStaticMarkup(
        <Document
          assets={assets}
          app={app}
          data={data}
          styleTags={getStyleTag(sheet, data.isAmp)}
          helmet={headHelmet}
        />,
      );

      res.send(`<!doctype html>${doc}`);
    } catch ({ message }) {
      res.status(404).send(message);
    }
  });

export default server;
