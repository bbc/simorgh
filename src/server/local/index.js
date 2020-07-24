import path from 'path';
import expressStaticGzip from 'express-static-gzip';

import {
  articleDataPath,
  cpsAssetPageDataPath,
  frontPageDataPath,
  IdxDataPath,
  legacyAssetPageDataPath,
  mostReadDataRegexPath,
  onDemandRadioDataPath,
  onDemandTvDataPath,
  recommendationsDataRegex,
  secondaryColumnDataRegexPath,
} from '#app/routes/utils/regex';
import { LOCAL_SENDFILE_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import constructDataFilePath from './constructDataFilePath';

const logger = nodeLogger(__filename);

/*
 * Local env routes - fixture data
 */
const sendDataFile = (res, dataFilePath, next) => {
  res.sendFile(dataFilePath, {}, sendErr => {
    if (sendErr) {
      logger.error(LOCAL_SENDFILE_ERROR, { error: sendErr });
      next(sendErr);
    }
  });
};

const PUBLIC_DIRECTORY = 'build/public';

export default server => {
  server
    .use((req, res, next) => {
      if (req.url.substr(-1) === '/' && req.url.length > 1)
        res.redirect(301, req.url.slice(0, -1));
      else next();
    })
    .use(
      expressStaticGzip(PUBLIC_DIRECTORY, {
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
    .get(onDemandRadioDataPath, async ({ params }, res, next) => {
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
    .get(onDemandTvDataPath, async ({ params }, res, next) => {
      const { service, serviceId, brandEpisode, mediaId } = params;

      const dataFilePath = path.join(
        process.cwd(),
        'data',
        service,
        serviceId,
        brandEpisode,
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
    .get(secondaryColumnDataRegexPath, async ({ params }, res, next) => {
      const { service, variant } = params;
      const dataFilePath = constructDataFilePath({
        pageType: 'secondaryColumn',
        service,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(recommendationsDataRegex, async ({ params }, res, next) => {
      const { service, variant } = params;
      const dataFilePath = constructDataFilePath({
        pageType: 'recommendations',
        service,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(IdxDataPath, async ({ params }, res, next) => {
      const { idx } = params;
      const dataFilePath = path.join(process.cwd(), 'data', idx, 'index.json');
      sendDataFile(res, dataFilePath, next);
    })
    .get('/ckns_policy/*', (req, res) => {
      // Route to allow the cookie banner to make the cookie oven request
      // without throwing an error due to not being on a bbc domain.
      res.sendStatus(200);
    });
};
