import pathOr from 'ramda/src/pathOr';

const getMasterBrand = (externalId, liveRadioIdOverrides) =>
  pathOr(externalId, ['masterBrand', externalId], liveRadioIdOverrides);

export default getMasterBrand;
