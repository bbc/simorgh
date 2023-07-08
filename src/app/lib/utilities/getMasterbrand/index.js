import pathOr from 'ramda/src/pathOr.js';

const getMasterBrand = (externalId, liveRadioIdOverrides) =>
  pathOr(externalId, ['masterBrand', externalId], liveRadioIdOverrides);

export default getMasterBrand;
