import isEmpty from 'ramda/src/isEmpty';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import getAssetType from './getAssetType';
import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

const pageTypeUrls = (assetType, service, variant) => {
  switch (assetType) {
    case STORY_PAGE:
      return [
        {
          name: 'mostRead',
          path: getMostReadEndpoint({ service, variant }).replace('.json', ''),
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

const fetchUrl = ({ name, path }) =>
  fetchPageData(path).then(response => validateResponse(response, name));

const getAdditionalPageData = async (pageData, service, variant) => {
  const assetType = getAssetType(pageData);

  const urlsToFetch = pageTypeUrls(assetType, service, variant);

  if (urlsToFetch) {
    return Promise.all(urlsToFetch.map(fetchUrl)).then(results =>
      Object.assign({}, ...results),
    );
  }

  return null;
};

export default getAdditionalPageData;
