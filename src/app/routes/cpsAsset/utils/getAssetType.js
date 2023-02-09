import pathOr from 'ramda/src/pathOr';

const getCPSAssetType = pageData =>
  pathOr(undefined, ['metadata', 'type'], pageData);
const getOptimoAssetType = pageData =>
  pathOr(undefined, ['data', 'article', 'metadata', 'type'], pageData);
const getAssetType = pageData =>
  getCPSAssetType(pageData) ?? getOptimoAssetType(pageData);

export default getAssetType;
