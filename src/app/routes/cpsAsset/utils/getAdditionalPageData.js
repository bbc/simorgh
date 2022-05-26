import isEmpty from 'ramda/src/isEmpty';
import {
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import getMostWatchedEndpoint from '#lib/utilities/getUrlHelpers/getMostWatchedUrl';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';
import getRecommendationsUrl, {
  portugueseRecommendationsExperimentEndpoint,
} from '#lib/utilities/getUrlHelpers/getRecommendationsUrl';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getAgent from '#server/utilities/getAgent/index';
import getAssetType from './getAssetType';
import getAssetUri from './getAssetUri';
import hasRecommendations from './hasRecommendations';
import hasMostRead from './hasMostRead';
import fetchPageData from '../../utils/fetchPageData';

const noop = () => {};

// 004_brasil_recommendations_experiment
const getRecommendations = (service, variant, assetUri) => {
  if (service !== 'portuguese') {
    return [
      {
        name: 'recommendations',
        path: getRecommendationsUrl({ assetUri, variant }),
        assetUri,
        api: 'recommendations',
        apiContext: 'secondary_data',
      },
    ];
  }

  return [
    {
      name: 'recommendations',
      path: portugueseRecommendationsExperimentEndpoint({
        assetUri,
        engine: 'unirecs_camino',
      }),
      assetUri,
      api: 'recommendations',
      apiContext: 'secondary_data',
    },
    {
      name: 'experimentRecommendations',
      engine: 'unirecs_datalab_content',
      path: portugueseRecommendationsExperimentEndpoint({
        assetUri,
        engine: 'unirecs_datalab',
        engineVariant: 'content',
      }),
      assetUri,
      api: 'datalab_content',
      apiContext: 'secondary_data',
    },
    {
      name: 'experimentRecommendations',
      engine: 'unirecs_datalab_hybrid',
      path: portugueseRecommendationsExperimentEndpoint({
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
          ? getRecommendations(service, variant, assetUri)
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

const validateResponse = ({ status, json }, name, engine) => {
  if (status === 200 && !isEmpty(json)) {
    // 004_brasil_recommendations_experiment
    return engine ? { [name]: { [engine]: json } } : { [name]: json };
  }

  return null;
};

// 004_brasil_recommendations_experiment
const sortAdditionalPageData = results => {
  return results.reduce((accum, pageData) => {
    if (pageData && pageData.experimentRecommendations) {
      return {
        ...accum,
        experimentRecommendations: {
          ...accum.experimentRecommendations,
          ...pageData.experimentRecommendations,
        },
      };
    }

    return {
      ...accum,
      ...pageData,
    };
  }, {});
};

const fetchUrl = async ({ name, path, engine, ...loggerArgs }) => {
  // 004_brasil_recommendations_experiment
  const agent = engine ? await getAgent() : null;

  return fetchPageData({
    path,
    timeout: SECONDARY_DATA_TIMEOUT,
    agent,
    ...loggerArgs,
  })
    .then(response => validateResponse(response, name, engine, path))
    .catch(noop);
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
    return Promise.all(urlsToFetch.map(fetchUrl)).then(sortAdditionalPageData);
  }

  return null;
};

export default getAdditionalPageData;
