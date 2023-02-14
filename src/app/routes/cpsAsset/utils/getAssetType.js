import pathOr from 'ramda/src/pathOr';

const getCPSAssetType = pageData =>
  pathOr(null, ['metadata', 'type'], pageData);
const getOptimoAssetType = pageData =>
  pathOr(null, ['data', 'article', 'metadata', 'type'], pageData);
const getAssetType = pageData =>
  getCPSAssetType(pageData) ?? getOptimoAssetType(pageData);

export default getAssetType;
