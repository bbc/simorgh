import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { getAssetType } from './getAssetType';
import fetchPageData from '../../utils/fetchPageData';

const pageTypeUrls = (assetType, service) => {
  switch (assetType) {
    case STORY_PAGE:
      return [
        {
          name: 'mostRead',
          path: `/${service}/mostread`,
        },
      ];
    default:
      return null;
  }
};

const validateResponse = ({ status, json }, name) => {
  if (status == 200 && json) {
    return { [name]: json };
  }

  return null;
};

const fetchUrl = ({ name, path }) =>
  fetchPageData(path).then(response => validateResponse(response, name));

const getAdditionalPageData = async (pageData, service, variant) => {
  const assetType = getAssetType(pageData);

  const urlsToFetch = pageTypeUrls(assetType, service);

  const data = await Promise.all(urlsToFetch.map(fetchUrl)).then(results =>
    Object.assign({}, ...results),
  );

  return data;
};

export default getAdditionalPageData;
