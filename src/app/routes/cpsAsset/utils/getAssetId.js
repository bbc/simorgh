import path from 'ramda/src/path';

const getAssetId = pageData =>
  path(['metadata', 'locators', 'assetId'], pageData);

export default getAssetId;
