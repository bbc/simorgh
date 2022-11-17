import isEmpty from 'ramda/src/isEmpty';
import {
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import getMostWatchedEndpoint from '#lib/utilities/getUrlHelpers/getMostWatchedUrl';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';
import getRecommendationsUrl from '#lib/utilities/getUrlHelpers/getRecommendationsUrl';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getAgent from '#server/utilities/getAgent/index';
import nodeLogger from '#lib/logger.node';
import { DATA_FETCH_ERROR } from '#lib/logger.const';
import getAssetType from './getAssetType';
import getAssetUri from './getAssetUri';
import hasRecommendations from './hasRecommendations';
import hasMostRead from './hasMostRead';
import fetchPageData from '../../utils/fetchPageData';

const noop = () => {};
const logger = nodeLogger(__filename);

// 004_brasil_recommendations_experiment
const getRecommendations = (service, assetUri) => {
  if (service !== 'portuguese') {
    const UNIRECS_ALLOW_LIST = ['indonesia', 'mundo', 'turkce'];

    return [
      {
        name: 'recommendations',
        attachAgent: true,
        path: getRecommendationsUrl({
          assetUri,
          ...(UNIRECS_ALLOW_LIST.includes(service) && {
            engine: 'unirecs_datalab',
          }),
        }),
        assetUri,
        api: 'recommendations',
        apiContext: 'secondary_data',
      },
    ];
  }

  return [
    {
      name: 'recommendations',
      attachAgent: true,
      path: getRecommendationsUrl({
        assetUri,
        engine: 'unirecs_camino',
      }),
      assetUri,
      api: 'recommendations',
      apiContext: 'secondary_data',
    },
    {
      name: 'datalabContentRecommendations',
      attachAgent: true,
      engine: 'unirecs_datalab_content',
      path: getRecommendationsUrl({
        assetUri,
        engine: 'unirecs_datalab',
        engineVariant: 'content',
      }),
      assetUri,
      api: 'datalab_content',
      apiContext: 'secondary_data',
    },
    {
      name: 'datalabHybridRecommendations',
      attachAgent: true,
      engine: 'unirecs_datalab_hybrid',
      path: getRecommendationsUrl({
        assetUri,
        engine: 'unirecs_datalab',
        engineVariant: 'hybrid',
      }),
      assetUri,
      api: 'datalab_hybrid',
      apiContext: 'secondary_data',
    },
  ];
};

const pageTypeUrls = async (
  assetType,
  service,
  variant,
  assetUri,
  pageData,
  env,
) => {
  switch (assetType) {
    case STORY_PAGE:
    case CORRESPONDENT_STORY_PAGE:
      return [
        (await hasMostRead(service, variant))
          ? {
              name: 'mostRead',
              path: getMostReadEndpoint({ service, variant }).replace(
                '.json',
                '',
              ),
              assetUri,
              api: 'mostread',
              apiContext: 'secondary_data',
            }
          : null,
        {
          name: 'secondaryColumn',
          path: getSecondaryColumnUrl({ service, variant }),
          assetUri,
          api: 'secondary_column',
          apiContext: 'secondary_data',
        },
        // 004_brasil_recommendations_experiment
        ...((await hasRecommendations(service, variant, pageData))
          ? getRecommendations(service, assetUri)
          : []),
      ].filter(i => i);
    case MEDIA_ASSET_PAGE:
      return [
        {
          name: 'mostWatched',
          path: getMostWatchedEndpoint({ service, variant, env }),
          assetUri,
          api: 'mostwatched',
          apiContext: 'secondary_data',
        },
      ];
    default:
      return null;
  }
};

const validateResponse = ({ status, json }, name) => {
  if (status === 200 && !isEmpty(json)) {
    // 004_brasil_recommendations_experiment
    return { [name]: json };
  }

  return null;
};

const fetchUrl = async ({ name, path, attachAgent, ...loggerArgs }) => {
  // 004_brasil_recommendations_experiment
  try {
    const agent = attachAgent ? await getAgent() : null;

    return fetchPageData({
      path,
      timeout: SECONDARY_DATA_TIMEOUT,
      agent,
      ...loggerArgs,
    })
      .then(response => validateResponse(response, name))
      .catch(noop);
  } catch (error) {
    logger.error(DATA_FETCH_ERROR, {
      data: path,
      path,
      ...loggerArgs,
    });

    return null;
  }
};

const getAdditionalPageData = async ({ pageData, service, variant, env }) => {
  const assetType = getAssetType(pageData);
  const assetUri = getAssetUri(pageData);

  const urlsToFetch = await pageTypeUrls(
    assetType,
    service,
    variant,
    assetUri,
    pageData,
    env,
  );

  if (urlsToFetch) {
    // 004_brasil_recommendations_experiment
    return Promise.all(urlsToFetch.map(fetchUrl)).then(results =>
      Object.assign({}, ...results),
    );
  }

  return null;
};

export default getAdditionalPageData;
