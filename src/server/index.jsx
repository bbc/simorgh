import express from 'express';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import pathOr from 'ramda/src/pathOr';
// not part of react-helmet
import helmet from 'helmet';
import gnuTP from 'gnu-terry-pratchett';
import routes from '#app/routes';
import {
  articleDataPath,
  articleManifestPath,
  articleSwPath,
  frontPageDataPath,
  frontPageManifestPath,
  frontPageSwPath,
  cpsAssetPageDataPath,
  radioAndTvDataPath,
  mostReadDataRegexPath,
  legacyAssetPageDataPath,
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
  LOCAL_SENDFILE_ERROR,
  ROUTING_INFORMATION,
} from '#lib/logger.const';

const fs = require('fs');

const morgan = require('morgan');

const logger = nodeLogger(__filename);

const publicDirectory = 'build/public';

logger.debug(
  `Application outputting logs to directory '${process.env.LOG_DIR}'`,
);

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["write"] }] */
class LoggerStream {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}
const secondaryColumData = {
  featuresAndAnalysis: [
    {
      headlines: {
        shortHeadline: 'STY - Ọrụ bekee na ịrụrụ onwe gị ọrụ, kedụ nk?',
        headline: 'STY - Ọrụ bekee na ịrụrụ onwe gị ọrụ, kedụ nk?',
      },
      locators: {
        assetUri: '/igbo/afirika-23252735',
        cpsUrn: 'urn:bbc:content:assetUri:igbo/afirika-23252735',
        curie:
          'http://www.bbc.co.uk/asset/954b3c17-7900-9342-aa1a-6857067770d7',
      },
      summary:
        'This is a test asset used in Simorgh, please do not edit it without asking.',
      timestamp: 1580745507000,
      byline: {
        name: 'By Andrew Overtyped Marr',
        title: 'BBC News - Overtyped',
        persons: [
          {
            name: 'Andrew Marr',
            function: 'BBC News',
            thumbnail:
              'http://wwwpreview.test.newsonline.tc.nca.bbc.co.uk/media/images/50002000/jpg/_50002170_andrew_marr_112_bbc.jpg',
          },
        ],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5ad86270c93a9f000eecb255',
            campaignName: 'Amuse me',
          },
        ],
      },
      indexImage: {
        id: '63724372',
        subType: 'index',
        href:
          'http://b.files.bbci.co.uk/6ACE/test/_63724372_gettyimages-1098075358.jpg',
        path: '/cpsdevpb/6ACE/test/_63724372_gettyimages-1098075358.jpg',
        height: 549,
        width: 976,
        altText: 'Some people at the NTA awards',
        copyrightHolder: 'Joe Maher',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:igbo/afirika-23252735',
      type: 'cps',
    },
    {
      headlines: {
        shortHeadline: 'Zimbabwe eferela Robert Mugabe aka',
        headline: 'Robert Mugabe: Zimbabwe eferela nwa amadi a aka',
      },
      locators: {
        assetUri: '/igbo/afirika-49666505',
        cpsUrn: 'urn:bbc:content:assetUri:igbo/afirika-49666505',
        curie:
          'http://www.bbc.co.uk/asset/40af9483-cf8c-254f-b5f8-af1fa2a74436',
      },
      summary:
        "Gọọmentị nakwa ndị Zimbabwe pụtara n'igwe iji kwanyere aka chịburu ha bụ Robert Mugabe ugwu ikpeazụ ya na Harare.",
      timestamp: 1580745507000,
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
          categoryName: 'Feature',
        },
        campaigns: [
          {
            campaignId: '5a988e3e39461b000e9dabfb',
            campaignName: 'WS - Keep me on trend',
          },
        ],
      },
      indexImage: {
        id: '108810335',
        subType: 'index',
        href:
          'http://c.files.bbci.co.uk/D035/production/_108810335_mugabe2.jpg',
        path: '/cpsprodpb/D035/production/_108810335_mugabe2.jpg',
        height: 549,
        width: 976,
        altText:
          "Ndị mmadụ na-agụ egwu iji kwanyere Robert Mugabe ugwu n'akwamozu ya.",
        caption:
          "Ndị mmadụ na-agụ egwu iji kwanyere Robert Mugabe ugwu n'akwamozu ya.",
        copyrightHolder: 'BBC',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:igbo/afirika-49666505',
      type: 'cps',
    },
  ],
  topStories: [
    {
      headlines: {
        headline:
          'China dice tener una vacuna contra el nuevo coronavirus lista para pruebas en humanos',
      },
      locators: {
        assetUri: '/mundo/noticias-internacional-51939501',
        cpsUrn:
          'urn:bbc:content:assetUri:mundo/noticias-internacional-51939501',
        assetId: '51939501',
      },
      summary:
        'Un día después de que en Estados Unidos anunciaran que pasan a probar en humanos una posible vacuna para el nuevo coronavirus, diversas instituciones chinas revelaron este martes sus planes para iniciar a partir de abril ensayos clínicos de varias posibles vacunas contra el covid-19.',
      timestamp: 1580745507000,
      language: 'es',
      byline: {
        name: 'Redacción  ',
        title: 'BBC News Mundo',
        persons: [
          {
            name: 'Redacción',
            function: 'BBC News Mundo',
          },
        ],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        taggings: [],
      },
      cpsType: 'STY',
      indexImage: {
        id: '111335312',
        subType: 'index',
        href:
          'http://c.files.bbci.co.uk/5369/production/_111335312_gettyimages-1004465280.jpg',
        path:
          '/cpsprodpb/5369/production/_111335312_gettyimages-1004465280.jpg',
        height: 549,
        width: 976,
        altText: 'Una mujer china recibe una vacuna.',
        caption:
          'China es uno de los países que más se ha implicado en la búsqueda tanto de una vacuna como de métodos de detección del nuevo coronavirus.',
        copyrightHolder: 'Getty Images',
      },
      options: {
        isBreakingNews: false,
        isFactCheck: false,
      },
      prominence: 'standard',
      relatedItems: [
        {
          headlines: {
            headline:
              'Estados Unidos comienza a probar en humanos la primera vacuna contra el coronavirus',
          },
          locators: {
            assetUri: '/mundo/noticias-51921073',
            cpsUrn: 'urn:bbc:content:assetUri:/mundo/noticias-51921073',
          },
          summary:
            'Un total de 45 voluntarios sanos participarán en un ensayo clínico financiado por el gobierno federal.',
          timestamp: 1584402419000,
          language: 'es',
          cpsType: 'STY',
          id: 'urn:bbc:ares::asset:mundo/noticias-51921073',
          type: 'cps',
        },
      ],
      id: 'urn:bbc:ares::asset:mundo/noticias-internacional-51939501',
      type: 'cps',
    },
    {
      headlines: {
        headline:
          'Nigeria don get five new cases of Coronavirus - See how e happun',
      },
      locators: {
        assetUri: '/pidgin/tori-51945757',
        cpsUrn: 'urn:bbc:content:assetUri:pidgin/tori-51945757',
        assetId: '51945757',
      },
      summary:
        'Nigeria Health say di patients from UK and America travel come di kontri.',
      timestamp: 1580745507000,
      language: 'pcm',
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e2939461b000e9dabf8',
            campaignName: 'WS - Educate me',
          },
          {
            campaignId: '5a988e3e39461b000e9dabfb',
            campaignName: 'WS - Keep me on trend',
          },
        ],
        taggings: [],
      },
      cpsType: 'STY',
      indexImage: {
        id: '111336814',
        subType: 'index',
        href:
          'http://c.files.bbci.co.uk/A387/production/_111336814_39ac4483-c830-4858-85fb-ad8e2608afb4.jpg',
        path:
          '/cpsprodpb/A387/production/_111336814_39ac4483-c830-4858-85fb-ad8e2608afb4.jpg',
        height: 549,
        width: 976,
        altText: 'NCDC Oga and Nigeria Health Minister',
        copyrightHolder: 'BBC',
      },
      options: {
        isBreakingNews: false,
        isFactCheck: false,
      },
      prominence: 'standard',
      id: 'urn:bbc:ares::asset:pidgin/tori-51945757',
      type: 'cps',
    },
  ],
};

const constructDataFilePath = ({
  pageType,
  service,
  id,
  variant = '',
  assetUri,
}) => {
  let dataPath;

  switch (pageType) {
    case 'frontpage':
    case 'mostRead':
      dataPath = `${variant || 'index'}.json`;
      break;
    case 'cpsAssets':
    case 'legacyAssets':
      dataPath = `${variant}/${assetUri}.json`;
      break;
    default:
      dataPath = `${id}${variant}.json`;
  }

  return path.join(process.cwd(), 'data', service, pageType, dataPath);
};

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

/*
 * Prod only logging - response time
 */
if (process.env.SIMORGH_APP_ENV !== 'local') {
  server.use(logResponseTime);
}

/*
 * Local env routes - fixture data
 */
const sendDataFile = (res, dataFilePath, next) => {
  res.sendFile(dataFilePath, {}, (sendErr) => {
    if (sendErr) {
      logger.error(LOCAL_SENDFILE_ERROR, { error: sendErr });
      next(sendErr);
    }
  });
};

if (process.env.SIMORGH_APP_ENV === 'local') {
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
    .get(articleDataPath, async ({ params }, res, next) => {
      const { service, id, variant } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'articles',
        service,
        id,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(frontPageDataPath, async ({ params }, res, next) => {
      const { service, variant } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'frontpage',
        service,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(mostReadDataRegexPath, async ({ params }, res, next) => {
      const { service, variant } = params;
      const dataFilePath = constructDataFilePath({
        pageType: 'mostRead',
        service,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(radioAndTvDataPath, async ({ params }, res, next) => {
      const { service, serviceId, mediaId } = params;

      const dataFilePath = path.join(
        process.cwd(),
        'data',
        service,
        serviceId,
        mediaId,
      );

      sendDataFile(res, `${dataFilePath}.json`, next);
    })
    .get(cpsAssetPageDataPath, async ({ params }, res, next) => {
      const { service, assetUri, variant } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'cpsAssets',
        service,
        assetUri,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(legacyAssetPageDataPath, async ({ params }, res, next) => {
      const { service, assetUri, variant } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'legacyAssets',
        service,
        assetUri,
        variant,
      });
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
  .get([articleSwPath, frontPageSwPath], (req, res) => {
    const swPath = `${__dirname}/public/sw.js`;
    res.sendFile(swPath, {}, (error) => {
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
      res.sendFile(manifestPath, {}, (error) => {
        if (error) {
          logger.error(MANIFEST_SENDFILE_ERROR, { error });
          res.status(500).send('Unable to find manifest.');
        }
      });
    },
  )
  .get('/:service/testdata.json', async ({ params }, res) => {
    res.set('Cache-Control', 'public, max-age=31557600'); // testing the app respects the cache
    res.status(200).send(secondaryColumData);
  })
  .get(
    '/*',
    injectCspHeaderProdBuild,
    async ({ url, headers, path: urlPath }, res) => {
      logger.info(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
        url,
        headers,
      });

      try {
        const { service, isAmp, route, variant } = getRouteProps(
          routes,
          urlPath,
        );
        const data = await route.getInitialData({ path: url, service });
        const { status } = data;
        const bbcOrigin = headers['bbc-origin'];

        data.path = urlPath;
        data.timeOnServer = Date.now();

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
          pageType: pathOr('Error', ['pageData', 'metadata', 'type'], data),
        });

        if (result.redirectUrl) {
          res.redirect(301, result.redirectUrl);
        } else if (result.html) {
          res.status(status).send(result.html);
        } else {
          throw new Error('unknown result');
        }
      } catch ({ message, status }) {
        logger.error(SERVER_SIDE_REQUEST_FAILED, {
          status: status || 500,
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
