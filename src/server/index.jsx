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
import WebmoduleClient from '@bbc/webmodule-client';
import routes, {
  articleRegexPath,
  articleDataRegexPath,
  swRegexPath,
} from '../app/routes';
import { getStyleTag } from './styles';
import getAssetsArray from './assets';
import Document from '../app/components/Document';
import nodeLogger from '../app/helpers/logger.node';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const client = new WebmoduleClient({});

const httpOptions = {
  headers: {
    Accept: 'application/json',
  },
  cert: '/etc/pki/tls/private/client.key',
  key: '/etc/pki/tls/certs/client.crt',
  ca: '/Users/newcob01/dev/certs/CA/bbc-cloud-ca.pem',
};

const options = {
  headless: true,
  disableCookieBanner: false,
  page: {
    destination: 'news_ps',
    producer: 'news',
    section: 'technology',
    contentId: 'urn:bbc:ares:article:c85pqyj5m2ko',
    contentType: 'article',
  },
};

const assets = getAssetsArray();

const publicDirectory = 'build/public';
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data/test';

const renderArticle = async (url, data, orbit) => {
  const sheet = new ServerStyleSheet();

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
      orbit={orbit}
    />,
  );

  return doc;
};

logger.debug(
  `Application outputting logs to directory "${process.env.LOG_DIR}"`,
);

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["write"] }] */
class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

const server = express();
// prettier-ignore
server
  .disable('x-powered-by')
  .use(morgan('tiny', {
    'skip': (req, res) => (res.statusCode === 200),
    'stream': new LoggerStream()
  }))
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
        logger.error(`error reading article json, ${error}`);
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
  .get(swRegexPath, (req, res) => {
    const swPath = `${__dirname}/public/sw-${process.env.APP_ENV}.js`;
    res.sendFile(swPath, {}, error => {
      if (error) {
        console.log(error); // eslint-disable-line no-console
        res.status(500).send('Unable to find service worker.');
      }
    });
  })
  .get(articleRegexPath, async ({ url }, res) => {
    try {
      const data = await loadInitialData(url, routes);
      const { status } = data;

      client
  .get(
    // I've explicitly copied JSON response, we'd have to send Accept header
    // Do we have to block our render on this? :( Though Orbit do recommend heavy caching
    // Is this the right place? I think we only have to do this on first page load, but...
    'http://webmodules.dev.bbc.co.uk:5000/dev-orbit-webmodules/orbit-modal.json',
    httpOptions,
  )
  .then(async webModule => {
    // webModule is cacheable at this point and different params can be
    // substituted into the same cached version as many times as you like
    const orbit = webModule.renderHTML(options);
    // console.log(`Head HTML: ${orbit.head}`);
    // console.log(`Body First HTML: ${orbit.bodyFirst}`);
    // console.log(`Body Last HTML: ${orbit.bodyLast}`);

    res
        .status(status)
        .send(`<!doctype html>${await renderArticle(url, data, orbit)}`);
  })
  .catch(error => {
    // handle error
    // webmodule client serves stale caches on error, so this
    // only happens when caches are cold
    console.log(error);
  });
    } catch ({ message, status }) {
      // Return an internal server error for any uncaught errors
      logger.error(`status: ${status || 500} - ${message}`);
      res.status(500).send(message);
    }
  });

export default server;
