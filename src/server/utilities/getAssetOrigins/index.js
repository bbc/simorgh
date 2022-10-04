import isLiveEnv from '#lib/utilities/isLive';
import services from '../serviceConfigs';

const getAssetOrigins = service => {
  const COOKIE_ORIGINS = isLiveEnv()
    ? ['https://www.bbc.com/cookieoven', 'https://www.bbc.co.uk/cookieoven']
    : [
        'https://www.test.bbc.com/cookieoven',
        'https://www.test.bbc.co.uk/cookieoven',
      ];

  const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';

  const ANALYTICS_ORIGINS = [
    'https://ping.chartbeat.net',
    'https://client.rum.us-east-1.amazonaws.com',
    'https://dataplane.rum.eu-west-1.amazonaws.com',
  ];

  const FONTS_ORIGINS = [
    'https://gel.files.bbci.co.uk',
    'https://ws-downloads.files.bbci.co.uk',
  ];

  const assetOrigins = [
    ...COOKIE_ORIGINS,
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
