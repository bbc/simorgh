import pathOr from 'ramda/src/pathOr';

export const getAssetTypeCode = pathOr(null, ['assetTypeCode']);

export const getHeadline = item =>
  getAssetTypeCode(item) !== null
    ? pathOr(null, ['name'], item)
    : pathOr(null, ['headlines', 'headline'], item);

export const getUrl = item =>
  getAssetTypeCode(item) !== null
    ? pathOr(null, ['uri'], item)
    : pathOr(null, ['locators', 'assetUri'], item);

export const getIsLive = item =>
  getAssetTypeCode(item) === null
    ? pathOr(false, ['cpsType'], item) === 'LIV'
    : false;
