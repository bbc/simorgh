import express from 'express';
import compression from 'compression';
import ramdaPath from 'ramda/src/path';
// not part of react-helmet
import helmet from 'helmet';
import gnuTP from 'gnu-terry-pratchett';
import routes from '#app/routes';
import {
  articleManifestPath,
  articleSwPath,
  frontPageManifestPath,
  frontPageSwPath,
} from '../app/routes/utils/regex';
import nodeLogger from '#lib/logger.node';
import renderDocument from './Document';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import logResponseTime from './utilities/logResponseTime';
import injectCspHeader from './utilities/cspHeader';
import {
  SERVICE_WORKER_SENDFILE_ERROR,
  MANIFEST_SENDFILE_ERROR,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
  ROUTING_INFORMATION,
} from '#lib/logger.const';
import { OK } from '#lib/statusCodes.const';
import sendCustomMetric from './utilities/customMetrics';
import { NON_200_RESPONSE } from './utilities/customMetrics/metrics.const';
import local from './local';

const fs = require('fs');

const morgan = require('morgan');

const logger = nodeLogger(__filename);

logger.debug(
  `Application outputting logs to directory '${process.env.LOG_DIR}'`,
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

const getBuildMetadata = () => {
  const { buildMetadata } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return buildMetadata;
};

const skipMiddleware = (_req, _res, next) => {
  next();
};

const injectCspHeaderProdBuild =
  process.env.NODE_ENV !== 'production' ? skipMiddleware : injectCspHeader;

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
    res.status(200).send(getBuildMetadata());
  });

// Set Up Local Server
if (process.env.SIMORGH_APP_ENV === 'local') {
  local(server);
} else {
  // Prod only logging - response time
  server.use(logResponseTime);
}

/*
 * Application env routes
 */
server
  .get([articleSwPath, frontPageSwPath], (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(SERVICE_WORKER_SENDFILE_ERROR, { error });
        res.status(500).send('Unable to find service worker.');
      }
    });
  })
  .get(
    [articleManifestPath, frontPageManifestPath],
    async ({ params }, res) => {
      const { service } = params;
      const manifestPath = `${__dirname}/public/${service}/manifest.json`;
      res.set('Cache-Control', 'public, max-age=604800');
      res.sendFile(manifestPath, {}, error => {
        if (error) {
          logger.error(MANIFEST_SENDFILE_ERROR, { error });
          res.status(500).send('Unable to find manifest.');
        }
      });
    },
  )
  .get(
    '/*',
    injectCspHeaderProdBuild,
    async ({ url, headers, path: urlPath }, res) => {
      logger.info(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
        url,
        headers,
      });

      let derivedPageType = 'Unknown';

      try {
        const {
          service,
          isAmp,
          route: { getInitialData, pageType },
          variant,
        } = getRouteProps(routes, urlPath);

        // Set derivedPageType based on matched route
        derivedPageType = pageType || derivedPageType;

        const data = await getInitialData({
          path: url,
          service,
          variant,
          pageType,
        });

        const { status } = data;
        const bbcOrigin = headers['bbc-origin'];
        data.path = urlPath;
        data.timeOnServer = Date.now();

        // Set derivedPageType based on returned page data
        if (status === OK) {
          derivedPageType = ramdaPath(['pageData', 'metadata', 'type'], data);
        } else {
          sendCustomMetric({
            metricName: NON_200_RESPONSE,
            statusCode: status,
            pageType: derivedPageType,
            requestUrl: url,
          });
        }

        const result = await renderDocument({
          bbcOrigin,
          data,
          isAmp,
          routes,
          service,
          url,
          variant,
        });

        logger.info(ROUTING_INFORMATION, {
          url,
          status,
          pageType: derivedPageType,
        });

        if (result.redirectUrl) {
          res.redirect(301, result.redirectUrl);
        } else if (result.html) {
          res.status(status).send(result.html);
        } else {
          throw new Error('unknown result');
        }
      } catch ({ message, status = 500 }) {
        sendCustomMetric({
          metricName: NON_200_RESPONSE,
          statusCode: status,
          pageType: derivedPageType,
          requestUrl: url,
        });

        logger.error(SERVER_SIDE_REQUEST_FAILED, {
          status,
          message,
          url,
          headers,
        });

        // Return an internal server error for any uncaught errors
        res.status(500).send(message);
      }
    },
  );

export default server;
