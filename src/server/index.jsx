import express from 'express';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
// not part of react-helmet
import helmet from 'helmet';
import gnuTP from 'gnu-terry-pratchett';
import routes from '../app/routes';
import {
  articleRegexPath,
  articleDataRegexPath,
  frontpageDataRegexPath,
  manifestRegexPath,
  swRegexPath,
} from '../app/routes/regex';
import nodeLogger from '../app/helpers/logger.node';
import renderDocument from './Document';
import getRouteProps from '../app/routes/getInitialData/utils/getRouteProps';
import getDials from './getDials';

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
  const sendDataFile = (res, dataFilePath, next) => {
    res.sendFile(dataFilePath, {}, sendErr => {
      if (sendErr) {
        logger.error(sendErr);
        next(sendErr);
      }
    });
  };

  server
    .use(
      expressStaticGzip(publicDirectory, {
        enableBrotli: true,
        orderPreference: ['br'],
      }),
    )
    .get(articleDataRegexPath, async ({ params }, res, next) => {
      const { service, id } = params;

      const dataFilePath = path.join(
        process.cwd(),
        dataFolderToRender,
        service,
        'articles',
        `${id}.json`,
      );

      sendDataFile(res, dataFilePath, next);
    })
    .get(frontpageDataRegexPath, async ({ params }, res, next) => {
      const { service } = params;

      const dataFilePath = path.join(
        process.cwd(),
        dataFolderToRender,
        service,
        'frontpage',
        'index.json',
      );

      sendDataFile(res, dataFilePath, next);
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
  .get(
    '/:service(igbo|pidgin|yoruba)(.amp|/beta|/beta.amp)?',
    ({ params }, res) => {
      // This is a temporary route to unblock route setup in Mozart.
      // Simply returns a 200 response which can we route to until
      // it's set up properly in simorgh.
      const { service } = params;
      res
        .status(200)
        .send(`Welcome to the temporary ${service} homepage simorgh route`);
    },
  )
  .get(articleRegexPath, async ({ url, headers }, res) => {
    try {
      const { service, isAmp, route, match } = getRouteProps(routes, url);
      const data = await route.getInitialData(match.params);
      const { status } = data;
      const bbcOrigin = headers['bbc-origin'];

      let dials = {};
      try {
        dials = await getDials();
      } catch ({ message }) {
        logger.error(`Error fetching Cosmos dials: ${message}`);
      }

      res
        .status(status)
        .send(
          await renderDocument(
            url,
            data,
            routes,
            bbcOrigin,
            service,
            isAmp,
            dials,
          ),
        );
    } catch ({ message, status }) {
      // Return an internal server error for any uncaught errors
      logger.error(`status: ${status || 500} - ${message}`);
      res.status(500).send(message);
    }
  });

export default server;
