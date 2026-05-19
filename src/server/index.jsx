// biome-ignore-all lint/style/noCommonJs: we want this
// biome-ignore-all lint/nursery/useThisInClassMethods: we want this
/* eslint-disable import/no-relative-packages */
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
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
  ROUTING_INFORMATION,
  SERVER_STATUS_ENDPOINT_ERROR,
} from '#lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '#lib/statusCodes.const';
import isLocal from '#app/lib/utilities/isLocal';
import injectCspHeader from './utilities/cspHeader';
import logResponseTime from './utilities/logResponseTime';
import renderDocument from './Document';
import sendCustomMetric from './utilities/customMetrics';
import { NON_200_RESPONSE } from './utilities/customMetrics/metrics.const';
import local from './local';
import getAgent from './utilities/getAgent';
import {
  getServerExperiments,
  getExperimentVaryHeaders,
} from './utilities/experimentHeader';
import getAssetOrigins from './utilities/getAssetOrigins';
import extractHeaders from './utilities/extractHeaders';
import addPlatformToRequestChainHeader from './utilities/addPlatformToRequestChainHeader';
import createAdNonce from '../app/utilities/createAdNonce';
import { UNKNOWN_PAGE } from '../app/routes/utils/pageTypes';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const NORMAL_CACHE_TTL = 30;
const EXPERIMENTAL_CACHE_TTL = 45;

logger.debug(
  `Application outputting logs to directory '${process.env.LOG_DIR}'`,
);

const removeSensitiveHeaders = headers =>
  omit((process.env.SENSITIVE_HTTP_HEADERS || '').split(','), headers);

class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

const getDefaultMaxAge = req => req.originalUrl.indexOf('arabic/') !== -1
    ? EXPERIMENTAL_CACHE_TTL
    : NORMAL_CACHE_TTL;

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
  .use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      originAgentCluster: false,
      strictTransportSecurity: { maxAge: 15552000 },
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

// Set Up Local Server
if (process.env.SIMORGH_APP_ENV === 'local') {
  local(server);
}

const injectDefaultCacheHeader = (req, res, next) => {
  const defaultMaxAge = getDefaultMaxAge(req);
  const maxAge =
    req.originalUrl.indexOf('/topics/') !== -1
      ? defaultMaxAge * 8
      : defaultMaxAge;
  res.set(
    'Cache-Control',
    `public, stale-if-error=${maxAge * 10}, stale-while-revalidate=${
      maxAge * 4
    }, max-age=${maxAge}`,
  );
  next();
};

const injectPlatformToRequestChainHeader = (req, res, next) => {
  res.set(
    'req-svc-chain',
    addPlatformToRequestChainHeader({ headers: req.headers }),
  );
  next();
};

const injectResourceHintsHeader = (req, res, next) => {
  const { dnsPrefetchOrigins, preconnectOrigins } = getAssetOrigins(
    req.originalUrl,
  );

  const resourceHintsConfig = [
    ...dnsPrefetchOrigins.map(
      domainName => `<${domainName}>; rel="dns-prefetch"`,
    ),
    ...preconnectOrigins.map(
      domainName => `<${domainName}>; rel="preconnect"; crossorigin`,
    ),
  ];

  res.set('Link', resourceHintsConfig.join(','));

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
    injectDefaultCacheHeader,
    injectReferrerPolicyHeader,
    injectResourceHintsHeader,
    injectPlatformToRequestChainHeader,
  ],
  async ({ url, query, headers, path: urlPath }, res) => {
    let derivedPageType = UNKNOWN_PAGE;
    let serverSideExperiments = [];

    try {
      const {
        service,
        isAmp,
        isApp,
        isLite: isLiteRouteSuffix,
        route: { getInitialData, pageType },
        variant,
      } = getRouteProps(urlPath);

      // Check if using the .lite route
      const isLite = isLiteRouteSuffix;

      const { page } = query;

      // Set derivedPageType based on matched route
      derivedPageType = pageType || derivedPageType;

      logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
        url,
        headers: removeSensitiveHeaders(headers),
        pageType: derivedPageType,
      });

      const [togglesResult, navResult] = await Promise.allSettled([
        getToggles(service),
        fetchConfig({ service, pagePath: url, configType: 'navigation' }),
      ]);

      const toggles =
        togglesResult.status === 'fulfilled' ? (togglesResult.value ?? {}) : {};

      const navItems =
        navResult.status === 'fulfilled' ? navResult.value?.data?.items : null;

      const data = await getInitialData({
        path: url,
        service,
        variant,
        page,
        pageType,
        toggles,
        getAgent,
        isAmp,
      });

      const { isUK, showCookieBannerBasedOnCountry } = extractHeaders(headers);

      data.toggles = toggles;
      data.navItems = navItems;
      data.path = urlPath;
      data.timeOnServer = Date.now();
      data.showAdsBasedOnLocation = headers['bbc-adverts'] === 'true';
      data.showCookieBannerBasedOnCountry = showCookieBannerBasedOnCountry;
      data.isUK = isUK;
      data.isLite = isLite;
      data.country = (headers['x-country'] || headers['x-bbc-edge-country'])
        ?.toString()
        .toLowerCase();

      const nonce = createAdNonce({
        toggles,
        country: data.country,
        showAdsBasedOnLocation: data.showAdsBasedOnLocation,
        isLite,
        isAmp,
      });

      injectCspHeader({ isAmp, nonce, res });

      data.nonce = nonce;
      data.cspHeader = res.get('Content-Security-Policy');

      let { status } = data;
      // Set derivedPageType based on returned page data
      if (status === OK) {
        derivedPageType = ramdaPath(['pageData', 'metadata', 'type'], data);

        serverSideExperiments = getServerExperiments({
          headers,
          service,
          pageType: derivedPageType,
        });

        data.serverSideExperiments = serverSideExperiments;
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
          isApp,
          isLite,
          routes,
          service,
          url,
          variant,
          nonce,
        });
      } catch (error) {
        const { message } = error;

        status = 500;
        sendCustomMetric({
          metricName: NON_200_RESPONSE,
          statusCode: status,
          pageType: derivedPageType,
          requestUrl: url,
        });

        if (isLocal()) {
        }

        logger.error(SERVER_SIDE_REQUEST_FAILED, {
          status,
          message,
          url,
          headers: removeSensitiveHeaders(headers),
          pageType: derivedPageType,
        });

        result = await renderDocument({
          bbcOrigin,
          data: { error: true, status },
          isAmp,
          isApp,
          isLite,
          routes,
          service,
          url,
          variant,
          nonce,
        });
      }

      let routingInfoLogger = logger.debug;

      // If status is 400-499 then log a warning
      if (status >= BAD_REQUEST && status < INTERNAL_SERVER_ERROR) {
        routingInfoLogger = logger.warn;
      }

      // Otherwise if status is >= 500, log an error
      if (status >= INTERNAL_SERVER_ERROR) {
        routingInfoLogger = logger.error;
      }

      routingInfoLogger(ROUTING_INFORMATION, {
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

        const allVaryHeaders = ['X-Country'];
        const experimentVaryHeaders =
          !isAmp && getExperimentVaryHeaders(serverSideExperiments);
        if (experimentVaryHeaders) allVaryHeaders.push(experimentVaryHeaders);

        res.set('vary', allVaryHeaders);

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
