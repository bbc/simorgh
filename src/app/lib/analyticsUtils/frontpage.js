import deepGet from '../utilities/deepGet';

export const getPageIdentifier = frontpageData =>
  deepGet(['metadata', 'analyticsLabels', 'counterName'], frontpageData) ||
  'unknown.page';

// TODO this is wrong. Need to get the guid from analyticsLabels.curie, and then prepend 'urn:bbc:cps:' :)
export const getContentId = frontpageData =>
  deepGet(['metadata', 'analyticsLabels', 'cps_asset_id'], frontpageData);

export const getLanguage = frontpageData =>
  deepGet(['metadata', 'language'], frontpageData);

export const getPageTitle = frontpageData =>
  deepGet(['metadata', 'title'], frontpageData);
