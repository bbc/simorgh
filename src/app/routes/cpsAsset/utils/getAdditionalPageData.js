import isEmpty from 'ramda/src/isEmpty';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import getAssetType from './getAssetType';
import getAssetUri from './getAssetUri';
import hasRecommendations from './hasRecommendations';
import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import getSecondaryColumnUrl from '#lib/utilities/getSecondaryColumnUrl';
import getRecommendationsUrl from '#lib/utilities/getRecommendationsUrl';

const noop = () => {};

const pageTypeUrls = async (
  assetType,
  service,
  variant,
  assetUri,
  pageData,
) => {
  switch (assetType) {
    case STORY_PAGE:
      return [
        {
          name: 'mostRead',
          path: getMostReadEndpoint({ service, variant }).replace('.json', ''),
        },
        {
          name: 'secondaryColumn',
          path: getSecondaryColumnUrl({ service, variant }),
        },
        (await hasRecommendations(service, variant, pageData))
          ? {
              name: 'recommendations',
              path: getRecommendationsUrl({ assetUri, variant }),
            }
          : null,
      ].filter(i => i);
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

const fetchUrl = ({ name, path }) =>
  fetchPageData({ path })
    .then(response => validateResponse(response, name))
    .catch(noop);

const getAdditionalPageData = async (pageData, service, variant) => {
  const assetType = getAssetType(pageData);
  const assetUri = getAssetUri(pageData);

  const urlsToFetch = await pageTypeUrls(
    assetType,
    service,
    variant,
    assetUri,
    pageData,
  );

  if (urlsToFetch) {
    return Promise.all(urlsToFetch.map(fetchUrl)).then(results =>
      Object.assign({}, ...results),
    );
  }

  return null;
};

export default getAdditionalPageData;
