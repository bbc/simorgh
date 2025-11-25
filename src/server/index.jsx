/* eslint-disable no-console */
/* eslint-disable camelcase */
import express from 'express';
import compression from 'compression';
import ramdaPath from 'ramda/src/path';
import omit from 'ramda/src/omit';
// not part of react-helmet
import helmet from 'helmet';
import routes from '#app/routes';
import nodeLogger from '#lib/logger.node';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import {
  SERVICE_WORKER_SENDFILE_ERROR,
  MANIFEST_SENDFILE_ERROR,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
  ROUTING_INFORMATION,
  SERVER_STATUS_ENDPOINT_ERROR,
} from '#lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '#lib/statusCodes.const';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import isLocal from '#app/lib/utilities/isLocal';
import injectCspHeader from './utilities/cspHeader';
import logResponseTime from './utilities/logResponseTime';
import renderDocument from './Document';
import {
  homePageManifestPath,
  homePageSwPath,
} from '../app/routes/utils/regex';
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
import serviceConfigs from './utilities/serviceConfigs';
import createAdNonce from '../app/utilities/createAdNonce';

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const NORMAL_CACHE_TTL = 30;
const EXPERIMENTAL_CACHE_TTL = 45;

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

const getDefaultMaxAge = req => {
  return req.originalUrl.indexOf('arabic/') !== -1
    ? EXPERIMENTAL_CACHE_TTL
    : NORMAL_CACHE_TTL;
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

/*
 * Application env routes
 */
server
  .get(homePageSwPath, (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.set(
      `Cache-Control`,
      `public, stale-if-error=6000, stale-while-revalidate=600, max-age=300`,
    );
    res.sendFile(swPath, {}, error => {
      if (error) {
        logger.error(SERVICE_WORKER_SENDFILE_ERROR, { error });
        res.status(500).send(`Unable to find service worker in ${swPath}`);
      }
    });
  })
  .get(homePageManifestPath, async ({ params }, res) => {
    const { service } = params;
    const variant = defaultServiceVariants[service] || 'default';
    const manifestPath = `${__dirname}/public${serviceConfigs[service][variant].manifestPath}`;
    res.set(
      'Cache-Control',
      'public, stale-if-error=172800, stale-while-revalidate=172800, max-age=86400',
    );
    res.sendFile(manifestPath, {}, error => {
      if (error) {
        logger.error(MANIFEST_SENDFILE_ERROR, { error });
        res.status(500).send('Unable to find manifest.');
      }
    });
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
  const thisService = req.originalUrl.split('/')[1];

  const assetOrigins = getAssetOrigins(thisService);
  res.set(
    'Link',
    assetOrigins
      .map(domainName => {
        const crossOrigin =
          domainName === 'https://static.files.bbci.co.uk'
            ? `,<${domainName}>; rel="preconnect"; crossorigin`
            : '';
        return `<${domainName}>; rel="dns-prefetch", <${domainName}>; rel="preconnect"${crossOrigin}`;
      })
      .join(','),
  );
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
    let derivedPageType = 'Unknown';
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

      const toggles = await getToggles(service);

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
      data.path = urlPath;
      data.timeOnServer = Date.now();
      data.showAdsBasedOnLocation = headers['bbc-adverts'] === 'true';
      data.showCookieBannerBasedOnCountry = showCookieBannerBasedOnCountry;
      data.isUK = isUK;
      data.isLite = isLite;
      data.country = (headers['x-country'] || headers['x-bbc-edge-country'])
        ?.toString()
        .toLowerCase();

      if (pageType === 'article' && service === 'mundo' && !isAmp) {
        // Ensure secondaryColumn exists
        if (!data.pageData.secondaryColumn) {
          data.pageData.secondaryColumn = {};
        }
        const countrySpecificTopics = {
          ar: 'c7zp57yy6dzt',
          cl: 'c340qyppkk8t',
          mx: 'c340qyp6yggt',
          co: 'c404v5gz1rkt',
          es: 'c6vzy3wd189t',
          ve: 'cpzd49v9rd1t',
          us: 'cdr5613yzwqt',
          uy: 'cpzd498zwj6t',
          do: 'cr50y7pykkdt',
        };
        const defaultTopicId = 'c7zp57yyz25t';
        const hasCountryMatch =
          data.country &&
          Object.keys(countrySpecificTopics).includes(data.country);

        let countrySpecificData;
        let defaultTopicData;
        if (hasCountryMatch) {
          const countrySpecificId = countrySpecificTopics[data.country];
          [countrySpecificData, defaultTopicData] = await Promise.all([
            fetchDataFromBFF({
              pathname: `/${service}/topics/${countrySpecificId}?renderer_env=live`,
              pageType: 'topic',
              service,
              variant,
              isAmp,
              getAgent,
            }),
            fetchDataFromBFF({
              pathname: `/${service}/topics/${defaultTopicId}?renderer_env=live`,
              pageType: 'topic',
              service,
              variant,
              isAmp,
              getAgent,
            }),
          ]);
        } else {
          defaultTopicData = await fetchDataFromBFF({
            pathname: `/${service}/topics/${defaultTopicId}?renderer_env=live`,
            pageType: 'topic',
            service,
            variant,
            isAmp,
            getAgent,
          });
        }
        const countryArticles =
          countrySpecificData?.json?.data?.curations?.[0]?.summaries || [];
        const defaultArticles =
          defaultTopicData?.json?.data?.curations?.[0]?.summaries || [];

        if (hasCountryMatch && defaultTopicData) {
          data.pageData.secondaryColumn.PersonalisedContent = [
            {
              title: countrySpecificData.json.data.title,
              description: countrySpecificData.json.data.description,
              summaries: Array.isArray(countryArticles)
                ? countryArticles.slice(0, 4)
                : [],
              topicId: countrySpecificTopics[data.country],
            },
            {
              title: defaultTopicData.json.data.title,
              description: defaultTopicData.json.data.description,
              summaries: Array.isArray(defaultArticles)
                ? defaultArticles.slice(0, 4)
                : [],
              topicId: defaultTopicId,
            },
          ];
        } else if (defaultTopicData) {
          data.pageData.secondaryColumn.PersonalisedContent = [
            {
              title: defaultTopicData.json.data.title,
              description: defaultTopicData.json.data.description,
              summaries: Array.isArray(defaultArticles)
                ? defaultArticles.slice(0, 4)
                : [],
              topicId: defaultTopicId,
            },
          ];
        }
      }
      const nonce = createAdNonce({
        toggles,
        country: data.country,
        showAdsBasedOnLocation: data.showAdsBasedOnLocation,
        isLite,
        isAmp,
      });

      injectCspHeader({ isAmp, service, nonce, res });

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
          console.error(error);
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
