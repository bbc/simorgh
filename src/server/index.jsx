import express from 'express';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import fs from 'fs';
import path from 'path';
// not part of react-helmet
import helmet from 'helmet';
import gnuTP from 'gnu-terry-pratchett';
import loadInitialData from '../app/routes/loadInitialData';
import routes, {
  articleRegexPath,
  articleDataRegexPath,
  homePageRegexPath,
  homePageDataRegexPath,
  manifestRegexPath,
  swRegexPath,
} from '../app/routes';
import nodeLogger from '../app/helpers/logger.node';
import renderDocument from './Document';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const publicDirectory = 'build/public';
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data/test';

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

/*
 * Default headers, compression, logging, status route
 */

server
  .disable('x-powered-by')
  .use(
    morgan('tiny', {
      skip: (req, res) => res.statusCode === 200,
      stream: new LoggerStream(),
    }),
  )
  .use(compression())
  .use(helmet({ frameguard: { action: 'deny' } }))
  .use(gnuTP())
  .get('/status', (req, res) => {
    res.sendStatus(200);
  });

/*
 * Local env routes - fixture data
 */

if (process.env.APP_ENV === 'local') {
  server
    .use(
      expressStaticGzip(publicDirectory, {
        enableBrotli: true,
        orderPreference: ['br'],
      }),
    )
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
    .get(homePageDataRegexPath, async ({ params }, res) => {
      const { service } = params;

      const dataFilePath = path.join(
        dataFolderToRender,
        service,
        'index',
        'front_page.json',
      );

      fs.readFile(dataFilePath, (error, data) => {
        if (error) {
          res.sendStatus(404);
          logger.error(`error reading homepage json, ${error}`);
          return null;
        }

        const homePageJSON = JSON.parse(data);

        res.setHeader('Content-Type', 'application/json');
        res.json(homePageJSON);
        return null;
      });
    })
    .get('/ckns_policy/*', (req, res) => {
      // Route to allow the cookie banner to make the cookie oven request
      // without throwing an error due to not being on a bbc domain.
      res.sendStatus(200);
    });
}

/*
 * Application env routes
 */

server
  .get(swRegexPath, (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(error);
        res.status(500).send('Unable to find service worker.');
      }
    });
  })
  .get(manifestRegexPath, async ({ params }, res) => {
    const { service } = params;
    const manifestPath = `${__dirname}/public/${service}/manifest.json`;
    res.sendFile(manifestPath, {}, error => {
      if (error) {
        console.log(error); // eslint-disable-line no-console
        res.status(500).send('Unable to find manifest.');
      }
    });
  })
  .get(homePageRegexPath, async ({ url, headers }, res) => {
    try {
      const data = await loadInitialData(url, routes);
      const { status } = data;
      const bbcOrigin = headers['bbc-origin'];

      res
        .status(status)
        .send(await renderDocument(url, data, routes, bbcOrigin));
    } catch ({ message, status }) {
      // Return an internal server error for any uncaught errors
      logger.error(`status: ${status || 500} - ${message}`);
      res.status(500).send(message);
    }
  })
  .get(articleRegexPath, async ({ url, headers }, res) => {
    try {
      const data = await loadInitialData(url, routes);
      const { status } = data;
      const bbcOrigin = headers['bbc-origin'];

      res
        .status(status)
        .send(await renderDocument(url, data, routes, bbcOrigin));
    } catch ({ message, status }) {
      // Return an internal server error for any uncaught errors
      logger.error(`status: ${status || 500} - ${message}`);
      res.status(500).send(message);
    }
  });

export default server;
