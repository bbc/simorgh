import { pathOr } from 'rambda';

const getMasterBrand = (externalId, liveRadioIdOverrides) =>
  pathOr(externalId, ['masterBrand', externalId], liveRadioIdOverrides);

export default getMasterBrand;
