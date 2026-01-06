const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';
const ANALYTICS_ORIGINS = ['https://ping.chartbeat.net'];

const getAssetOrigins = () => {
  const assetOrigins = [
    IMAGES_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    process.env.SIMORGH_ATI_BASE_URL,
    ...ANALYTICS_ORIGINS,
  ];

  return assetOrigins;
};

export default getAssetOrigins;
