import path from 'path';
import expressStaticGzip from 'express-static-gzip';

import {
  articleDataPath,
  cpsAssetPageDataPath,
  frontPageDataPath,
  homePageDataPath,
  tipoHomeDataPath,
  legacyAssetPageDataPath,
  mostReadDataRegexPath,
  onDemandRadioDataPath,
  onDemandTvDataPath,
  topicDataPath,
  recommendationsDataRegex,
  secondaryColumnDataRegexPath,
  africaEyeTVDataPath,
  liveRadioDataPath,
  podcastEpisodeDataPath,
  podcastBrandDataPath,
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

const removeTrailingSlash = url => {
  const hasTrailingSlash = url.length > 1 && url.endsWith('/');
  const redirectUrl = hasTrailingSlash ? url.slice(0, -1) : url;

  return [hasTrailingSlash, redirectUrl];
};

export default server => {
  return server
    .use((req, res, next) => {
      const [shouldRedirect, redirectUrl] = removeTrailingSlash(req.url);
      return shouldRedirect ? res.redirect(301, redirectUrl) : next();
    })
    .use(expressStaticGzip(PUBLIC_DIRECTORY, { redirect: false }))
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
    .get(
      [homePageDataPath, tipoHomeDataPath],
      async ({ params }, res, next) => {
        const { service, variant } = params;

        const dataFilePath = constructDataFilePath({
          pageType: 'homePage',
          service,
          variant,
        });

        sendDataFile(res, dataFilePath, next);
      },
    )

    .get(mostReadDataRegexPath, async ({ params }, res, next) => {
      const { service, variant } = params;
      const dataFilePath = constructDataFilePath({
        pageType: 'mostRead',
        service,
        variant,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(liveRadioDataPath, async ({ params }, res, next) => {
      const { service, masterBrand } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'liveRadio',
        service,
        masterBrand,
      });

      sendDataFile(res, dataFilePath, next);
    })
    .get(podcastEpisodeDataPath, async ({ params }, res, next) => {
      const { service, brandId, mediaId } = params;

      const dataFilePath = path.join(
        process.cwd(),
        'data',
        service,
        'podcasts',
        brandId,
        mediaId,
      );

      sendDataFile(res, `${dataFilePath}.json`, next);
    })

    .get(podcastBrandDataPath, async ({ params }, res, next) => {
      const { service, brandId } = params;

      const dataFilePath = path.join(
        process.cwd(),
        'data',
        service,
        'podcasts',
        brandId,
      );

      sendDataFile(res, `${dataFilePath}.json`, next);
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
    .get(topicDataPath, async ({ params }, res, next) => {
      const { service, id, variant = '' } = params;

      const dataFilePath = path.join(
        process.cwd(),
        'data',
        service,
        variant,
        'topics',
        id,
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
    .get(africaEyeTVDataPath, async ({ params }, res, next) => {
      const { episodeId } = params;

      const dataFilePath = constructDataFilePath({
        pageType: 'africa_eye',
        episodeId,
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
    .get('/static/js/comscore/main-:version.js', ({ params }, res, next) => {
      const { version } = params;
      const localComscorePath = path.join(
        process.cwd(),
        `/public/static/js/comscore/main-${version}.js`,
      );
      sendDataFile(res, localComscorePath, next);
    })
    .get('/ckns_policy/*', (req, res) => {
      // Route to allow the cookie banner to make the cookie oven request
      // without throwing an error due to not being on a bbc domain.
      res.sendStatus(200);
    });
};
