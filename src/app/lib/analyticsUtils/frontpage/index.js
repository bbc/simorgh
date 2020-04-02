import pathOr from 'ramda/src/pathOr';

export const getPageIdentifier = (frontpageData, service) => {
  return pathOr(
    `${service || 'unknown'}.page`,
    ['metadata', 'analyticsLabels', 'counterName'],
    frontpageData,
  );
};

const guidRegex =
  '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})';
const curieRegex = new RegExp(
  `http://www.bbc.co.uk/asset/${guidRegex}/desktop/domestic`,
);

export const getContentId = (frontpageData) => {
  const curie = pathOr(null, ['metadata', 'locators', 'curie'], frontpageData);

  if (!curie) {
    return null;
  }

  const matches = curie.match(curieRegex);

  if (matches) {
    return `urn:bbc:cps:${matches[1]}`;
  }

  return null;
};

export const getLanguage = (frontpageData) =>
  pathOr(null, ['metadata', 'language'], frontpageData);

// This formatting of the page title is implemented independently of
// the actual page title in the metadata component. Ideally these would
// not be duplicated but refactored upwards. They cannot be refactored
// into the default page wrapper because that component does not have
// access to the page data.
export const getPageTitle = (frontpageData, brandName) => {
  const title = pathOr(null, ['metadata', 'title'], frontpageData);
  return title && `${title} - ${brandName}`;
};
