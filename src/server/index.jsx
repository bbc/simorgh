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
  articleManifestRegexPath,
  articleSwRegexPath,
  frontpageRegexPath,
  frontpageDataRegexPath,
  frontpageManifestRegexPath,
  frontpageSwRegexPath,
  mediaRadioAndTvRegexPathsArray,
} from '../app/routes/regex';
import nodeLogger from '../app/lib/logger.node';
import renderDocument from './Document';
import getRouteProps from '../app/routes/getInitialData/utils/getRouteProps';
import getDials from './getDials';
import logResponseTime from './utilities/logResponseTime';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const publicDirectory = 'build/public';

logger.debug(
  `Application outputting logs to directory "${process.env.LOG_DIR}"`,
);

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["write"] }] */
class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

const constructDataFilePath = (pageType, service, id) => {
  const dataPath = pageType === 'frontpage' ? 'index.json' : `${id}.json`;

  return path.join(process.cwd(), 'data', service, pageType, dataPath);
};

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
 * Prod only logging - response time
 */
if (process.env.APP_ENV !== 'local') {
  server.use(logResponseTime);
}

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
    .use((req, res, next) => {
      if (req.url.substr(-1) === '/' && req.url.length > 1)
        res.redirect(301, req.url.slice(0, -1));
      else next();
    })
    .use(
      expressStaticGzip(publicDirectory, {
        enableBrotli: true,
        orderPreference: ['br'],
        redirect: false,
      }),
    )
    .get(articleDataRegexPath, async ({ params }, res, next) => {
      const { service, id } = params;

      const dataFilePath = constructDataFilePath('articles', service, id);

      sendDataFile(res, dataFilePath, next);
    })
    .get(frontpageDataRegexPath, async ({ params }, res, next) => {
      const { service } = params;

      const dataFilePath = constructDataFilePath('frontpage', service);

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
  .get([articleSwRegexPath, frontpageSwRegexPath], (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(error);
        res.status(500).send('Unable to find service worker.');
      }
    });
  })
  .get(
    [articleManifestRegexPath, frontpageManifestRegexPath],
    async ({ params }, res) => {
      const { service } = params;
      const manifestPath = `${__dirname}/public/${service}/manifest.json`;
      res.sendFile(manifestPath, {}, error => {
        if (error) {
          console.log(error); // eslint-disable-line no-console
          res.status(500).send('Unable to find manifest.');
        }
      });
    },
  )
  .get(
    [articleRegexPath, frontpageRegexPath, ...mediaRadioAndTvRegexPathsArray],
    async ({ url, headers }, res) => {
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
        // Preserve initial dial state in window so it is available during hydration
        data.dials = dials;

        res.status(status).send(
          await renderDocument({
            bbcOrigin,
            data,
            isAmp,
            routes,
            service,
            url,
          }),
        );
      } catch ({ message, status }) {
        // Return an internal server error for any uncaught errors
        logger.error(`status: ${status || 500} - ${message}`);
        res.status(500).send(message);
      }
    },
  );

export default server;
