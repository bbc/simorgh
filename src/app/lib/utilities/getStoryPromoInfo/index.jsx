import pathOr from 'ramda/src/pathOr';

export const getAssetTypeCode = pathOr(null, ['assetTypeCode']);

export const getHeadline = item =>
  getAssetTypeCode(item) !== null
    ? item?.name || null
    : item?.headlines?.headline || null;

export const getUrl = item =>
  getAssetTypeCode(item) !== null
    ? item?.uri || null
    : item?.locators?.assetUri || null;

export const getIsLive = item =>
  getAssetTypeCode(item) === null ? item?.cpsType || false === 'LIV' : false;
