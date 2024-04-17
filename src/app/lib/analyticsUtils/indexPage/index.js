import pathOr from 'ramda/src/pathOr';
import {
  FRONT_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  HOME_PAGE,
} from '#app/routes/utils/pageTypes';

export const getPageIdentifier = (indexPageData, service) => {
  return pathOr(
    `${service || 'unknown'}.page`,
    ['metadata', 'analyticsLabels', 'counterName'],
    indexPageData,
  );
};

const guidRegex =
  '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})';
const curieRegex = new RegExp(
  `http://www.bbc.co.uk/asset/${guidRegex}/desktop/domestic`,
);

export const getContentId = indexPageData => {
  const curie = pathOr(null, ['metadata', 'locators', 'curie'], indexPageData);

  if (!curie) {
    return null;
  }

  const matches = curie.match(curieRegex);

  if (matches) {
    return `urn:bbc:cps:${matches[1]}`;
  }

  return null;
};

export const getLanguage = indexPageData =>
  pathOr(null, ['metadata', 'language'], indexPageData);

// This formatting of the page title is implemented independently of
// the actual page title in the metadata component. Ideally these would
// not be duplicated but refactored upwards. They cannot be refactored
// into the default page wrapper because that component does not have
// access to the page data.
export const getPageTitle = (indexPageData, brandName) => {
  const title = pathOr(null, ['metadata', 'title'], indexPageData);
  return title && `${title} - ${brandName}`;
};

export const getContentType = pageType => {
  switch (pageType) {
    case FRONT_PAGE:
    case HOME_PAGE:
      return 'index-home';
    case INDEX_PAGE:
      return 'index-section';
    case FEATURE_INDEX_PAGE:
      return 'index-section';
    default:
      return null;
  }
};
