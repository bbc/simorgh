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

      // Temporary dummy curation data for adaptive curations
      const dummyMediaCurationContent = {
        summaries: [
          {
            type: 'video',
            duration: 'PT4M4S',
            isLive: false,
            title:
              'पाकिस्तान और अफ़ग़ानिस्तान के संघर्ष ने कैसे बढ़ाई पाकिस्तान के लिए मुश्किलें? - वुसअत की डायरी',
            firstPublished: '2025-10-19T12:31:54.528Z',
            lastPublished: '2025-10-19T12:31:54.528Z',
            link: 'https://www.bbc.com/hindi/articles/c1e3lxjedj7o',
            imageUrl:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/9efb/live/b1e95390-acd7-11f0-b2a1-6f537f66f9aa.jpg.webp',
            description:
              'पाकिस्तान ने अफ़ग़ानिस्तान से संघर्ष में भारत का नाम भी लिया, जिस पर भारत के विदेश मंत्रालय ने भी सख्ती से जवाब दिया. ऐसे में भारत-अफ़ग़ानिस्तान को लेकर पाकिस्तान कैसे परेशान है. \nइसी पर देखिए पाकिस्तान के वरिष्ठ पत्रकार वुसतुल्लाह ख़ान की यह ख़ास टिप्पणी.',
            imageAlt:
              'पाकिस्तान और अफ़ग़ानिस्तान के संघर्ष में भारत का नाम कैसे आया?',
            id: 'c1e3lxjedj7o',
            readTime: 1,
          },
          {
            type: 'video',
            duration: 'PT17M15S',
            isLive: false,
            title:
              'सर सैयद अहमद ख़ान ने कैसे की थी अलीगढ़ मुस्लिम यूनिवर्सिटी की स्थापना? - विवेचना',
            firstPublished: '2025-10-19T12:29:49.472Z',
            lastPublished: '2025-10-19T12:29:49.472Z',
            link: 'https://www.bbc.com/hindi/articles/c39708z88myo',
            imageUrl:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/70ae/live/0631f9d0-acd7-11f0-b2a1-6f537f66f9aa.jpg.webp',
            description:
              'अलीगढ़ मुस्लिम यूनिवर्सिटी की स्थापना कब और कैसे हुई और इस दौरान सर सैयद अहमद ख़ान का विरोध क्यों किया गया? ',
            imageAlt: 'सर सैयद अहमद ख़ान',
            id: 'c39708z88myo',
            readTime: 1,
          },
          {
            type: 'video',
            duration: 'PT3M16S',
            isLive: false,
            title:
              'लड्डू से लेकर कलाकंद तक, कौन-सी मिठाई कितने दिन तक खाने लायक रहती है?',
            firstPublished: '2025-10-19T08:28:55.699Z',
            lastPublished: '2025-10-19T08:28:55.699Z',
            link: 'https://www.bbc.com/hindi/articles/c0kpvl588x5o',
            imageUrl:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/ca54/live/d1063da0-acc4-11f0-b2a1-6f537f66f9aa.jpg.webp',
            description:
              'एक दिन में कितनी मिठाई खाना सही है? और फ्रिज में रखी कौन-सी मिठाई कब तक ख़राब हो जाती है? फ़िट ज़िंदगी के आज के एपिसोड में यही जानिए.\n',
            imageAlt: 'दिवाली के वक्त मिठाइयों को लेकर बरतें सावधानी',
            id: 'c0kpvl588x5o',
            readTime: 1,
          },
          {
            type: 'video',
            duration: 'PT3M58S',
            isLive: false,
            title:
              'टिकट न मिलने से लेकर भीड़ तक, दिवाली के लिए घर जाने वालों की परेशानियां- ग्राउंड रिपोर्ट',
            firstPublished: '2025-10-18T14:22:27.963Z',
            lastPublished: '2025-10-18T14:22:27.963Z',
            link: 'https://www.bbc.com/hindi/articles/c62e7w36nq3o',
            imageUrl:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/afdf/live/31199a80-ac2e-11f0-ba75-093eca1ac29b.jpg.webp',
            description:
              'दिल्ली में रहकर नौकरी कर रहे लोग दिवाली और छठ पूजा के मौके़ पर अपने घर जा रहे हैं. \nलेकिन दिल्ली से घर तक का सफ़र हर किसी के लिए एक सा नहीं है. कई लोग ऐसे हैं, जिन्हें ट्रेन या बस की टिकट ही नहीं मिली. ',
            imageAlt:
              'दिवाली पर लोगों के लिए अपने घर तक जाना कितना मुश्किल? ग्राउंड रिपोर्ट',
            id: 'c62e7w36nq3o',
            readTime: 1,
          },
        ],
        activePage: 1,
        pageCount: 40,
        link: 'https://www.bbc.com/hindi/topics/cw9kv0kpxydt',
        curationId:
          'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd',
        curationType: 'vivo-stream',
        position: 6,
        visualProminence: 'NORMAL',
        title: 'मल्टीमीडिया',
        visualStyle: 'FEED',
      };

      const dummyBillboardCurationContent = {
        summaries: [
          {
            type: 'link',
            isLive: false,
            title: 'बीबीसी दुनिया देखने के लिए यहाँ क्लिक करें',
            firstPublished: '',
            lastPublished: '',
            link: 'https://www.bbc.com/hindi/bbc_hindi_tv/tv_programmes/w13xttlw',
            imageUrl:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/c5f6/live/11c27630-24a7-11ef-a13a-0b8c563da930.png.webp',
            description:
              'देखिए सोमवार से शुक्रवार हर रात 10 बजे से BBC News Hindi  के होम पेज पर.',
            imageAlt: 'बीबीसी दुनिया देखने के लिए यहाँ क्लिक करें',
          },
        ],
        id: 'https%3A%2F%2Fwww.bbc.com%2Fkyrgyz%2Fbbc_kyrgyz_tv%2Ftv_programmes%2Fw13xttqx%3Flimit%3D4',
        visualProminence: 'MAXIMUM',
        activePage: 1,
        pageCount: 1,
        curationId: 'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17',
        curationType: 'tipo-curation',
        position: 7,
        visualStyle: 'BANNER',
        title: 'बीबीसी दुनिया',
      };

      if (data && data.pageData && data.pageData.secondaryColumn) {
        data.pageData.secondaryColumn = {
          ...data.pageData.secondaryColumn,
          billboardCuration: {
            ...dummyBillboardCurationContent,
          },
          multimediaCuration: {
            ...dummyMediaCurationContent,
          },
        };
      }

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
