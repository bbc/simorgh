import path from 'ramda/src/path.js';

const getAssetUri = pageData =>
  path(['metadata', 'locators', 'assetUri'], pageData);

export default getAssetUri;
