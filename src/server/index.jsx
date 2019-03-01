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
    const swPath = `${__dirname}/public/sw.js`;
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(error);
        res.status(500).send('Unable to find service worker.');
      }
    });
  })
  .get(articleRegexPath, async ({ url }, res) => {
    try {
      const data = await loadInitialData(url, routes);
      const { status } = data;

      res
        .status(status)
        .send(await renderDocument(url, data, routes));
    } catch ({ message, status }) {
      // Return an internal server error for any uncaught errors
      logger.error(`status: ${status || 500} - ${message}`);
      res.status(500).send(message);
    }
  });

export default server;
