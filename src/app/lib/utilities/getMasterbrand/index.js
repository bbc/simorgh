const getMasterBrand = (externalId, liveRadioIdOverrides) =>
  liveRadioIdOverrides?.masterBrand?.[externalId] ?? externalId;

export default getMasterBrand;
