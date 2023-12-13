import services from '../serviceConfigs';

const getAssetOrigins = service => {
  const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';

  const ANALYTICS_ORIGINS = ['https://ping.chartbeat.net'];

  const FONTS_ORIGINS = ['https://ws-downloads.files.bbci.co.uk'];

  const assetOrigins = [
    IMAGES_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    process.env.SIMORGH_ATI_BASE_URL,
    ...ANALYTICS_ORIGINS,
  ];

  // include fonts domains if fonts are defined in service config
  const config = services[service];

  if (config) {
    const keys = Object.keys(config);
    const { fonts } = config[keys[0]];
    if (fonts && fonts.length > 0) {
      assetOrigins.push(...FONTS_ORIGINS);
    }
  }

  return assetOrigins;
};

export default getAssetOrigins;
