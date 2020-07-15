import path from 'ramda/src/path';

const getAssetUri = pageData =>
  path(['metadata', 'locators', 'assetUri'], pageData);

export default getAssetUri;
