import express from 'express';
import compression from 'compression';
import ramdaPath from 'ramda/src/path';
import omit from 'ramda/src/omit';
// not part of react-helmet
import helmet from 'helmet';
import routes from '#app/routes';
import nodeLogger from '#lib/logger.node';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import {
  SERVICE_WORKER_SENDFILE_ERROR,
  MANIFEST_SENDFILE_ERROR,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
  ROUTING_INFORMATION,
  SERVER_STATUS_ENDPOINT_ERROR,
} from '#lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { OK } from '#lib/statusCodes.const';
import injectCspHeader from './utilities/cspHeader';
import logResponseTime from './utilities/logResponseTime';
import renderDocument from './Document';
import {
  articleManifestPath,
  articleSwPath,
  frontPageManifestPath,
  frontPageSwPath,
} from '../app/routes/utils/regex';
import sendCustomMetric from './utilities/customMetrics';
import { NON_200_RESPONSE } from './utilities/customMetrics/metrics.const';
import local from './local';
import getAgent from './utilities/getAgent';
import getAssetOrigins from './utilities/getAssetOrigins';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

logger.debug(
  `Application outputting logs to directory '${process.env.LOG_DIR}'`,
);

const removeSensitiveHeaders = headers =>
  omit((process.env.SENSITIVE_HTTP_HEADERS || '').split(','), headers);

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
  .use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: false,
    }),
  )
  .use(logResponseTime)
  .get('/status', (req, res) => {
    try {
      res.status(200).send('Ok');
    } catch (error) {
      logger.error(SERVER_STATUS_ENDPOINT_ERROR, { error });
      res.status(500).send('Unable to determine status');
    }
  });

/*
 * Application env routes
 */
server
  .get([articleSwPath, frontPageSwPath], (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.set(
      `Cache-Control`,
      `public, stale-if-error=6000, stale-while-revalidate=300, max-age=300`,
    );
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(SERVICE_WORKER_SENDFILE_ERROR, { error });
        res.status(500).send(`Unable to find service worker in ${swPath}`);
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
  );

// Set Up Local Server
if (process.env.SIMORGH_APP_ENV === 'local') {
  local(server);
}

const injectDefaultCacheHeader = (req, res, next) => {
  res.set(
    'cache-control',
    `public, stale-if-error=90, stale-while-revalidate=30, max-age=30`,
  );
  next();
};

const injectResourceHintsHeader = (req, res, next) => {
  const thisService = req.originalUrl.split('/')[1];

  if (['pidgin', 'hindi'].includes(thisService)) {
    const assetOrigins = getAssetOrigins(thisService);
    res.set(
      'Link',
      assetOrigins
        .map(
          domainName =>
            `<${domainName}>; rel="dns-prefetch", <${domainName}>; rel="preconnect"`,
        )
        .join(','),
    );
  }
  next();
};
// Set Referrer-Policy
const injectReferrerPolicyHeader = (req, res, next) => {
  res.set('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
};

// Catch all for all routes
server.get(
  '/*',
  [
    injectCspHeaderProdBuild,
    injectDefaultCacheHeader,
    injectReferrerPolicyHeader,
    injectResourceHintsHeader,
  ],
  async ({ url, query, headers, path: urlPath }, res) => {
    logger.info(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
      url,
      headers: removeSensitiveHeaders(headers),
    });

    let derivedPageType = 'Unknown';

    try {
      const {
        service,
        isAmp,
        route: { getInitialData, pageType },
        variant,
      } = getRouteProps(urlPath);
      const { page } = query;

      // Set derivedPageType based on matched route
      derivedPageType = pageType || derivedPageType;

      const toggles = await getToggles(service);

      const data = await getInitialData({
        path: url,
        service,
        variant,
        page,
        pageType,
        toggles,
        getAgent,
      });

      data.toggles = toggles;
      data.path = urlPath;
      data.timeOnServer = Date.now();
      data.showAdsBasedOnLocation = headers['bbc-adverts'] === 'true';

      let { status } = data;
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

      const bbcOrigin = headers['bbc-origin'];
      let result;
      try {
        result = await renderDocument({
          bbcOrigin,
          data,
          isAmp,
          routes,
          service,
          url,
          variant,
        });
      } catch ({ message }) {
        status = 500;
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
          headers: removeSensitiveHeaders(headers),
        });

        result = await renderDocument({
          bbcOrigin,
          data: { error: true, status },
          isAmp,
          routes,
          service,
          url,
          variant,
        });
      }

      logger.info(ROUTING_INFORMATION, {
        url,
        status,
        pageType: derivedPageType,
      });

      if (result.redirectUrl) {
        res.redirect(301, result.redirectUrl);
      } else if (result.html) {
        res.set(
          'onion-location',
          `https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion${urlPath}`,
        );
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
        headers: removeSensitiveHeaders(headers),
      });

      res.status(500).send('Internal server error');
    }
  },
);

export default server;
