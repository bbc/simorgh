import isEmpty from 'ramda/src/isEmpty';
import { STORY_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import getAssetType from './getAssetType';
import getAssetUri from './getAssetUri';
import hasRecommendations from './hasRecommendations';
import hasMostRead from './hasMostRead';
import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import getMostWatchedEndpoint from '#lib/utilities/getUrlHelpers/getMostWatchedUrl';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';
import getRecommendationsUrl from '#lib/utilities/getUrlHelpers/getRecommendationsUrl';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';

const noop = () => {};

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
        (await hasRecommendations(service, variant, pageData))
          ? {
              name: 'recommendations',
              path: getRecommendationsUrl({ assetUri, variant }),
              assetUri,
              api: 'recommendations',
              apiContext: 'secondary_data',
            }
          : null,
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
    return { [name]: json };
  }

  return null;
};

const fetchUrl = ({ name, path, ...loggerArgs }) =>
  fetchPageData({ path, timeout: SECONDARY_DATA_TIMEOUT, ...loggerArgs })
    .then(response => validateResponse(response, name))
    .catch(noop);

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
    return Promise.all(urlsToFetch.map(fetchUrl)).then(results =>
      Object.assign({}, ...results),
    );
  }

  return null;
};

export default getAdditionalPageData;
