import deepGet from '../utilities/deepGet';

export const getPageIdentifier = frontpageData =>
  deepGet(['metadata', 'analyticsLabels', 'counterName'], frontpageData) ||
  'unknown.page';

const guidRegex =
  '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})';
const curieRegex = new RegExp(
  `http://www.bbc.co.uk/asset/${guidRegex}/desktop/domestic`,
);
export const getContentId = frontpageData => {
  const curie = deepGet(['metadata', 'locators', 'curie'], frontpageData);
  if (!curie) {
    return null;
  }
  const matches = curie.match(curieRegex);

  if (matches) {
    return `urn:bbc:cps:${matches[1]}`;
  }
  return null;
};

export const getLanguage = frontpageData =>
  deepGet(['metadata', 'language'], frontpageData);

export const getPageTitle = frontpageData =>
  deepGet(['metadata', 'title'], frontpageData);
