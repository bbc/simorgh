// List of originCodes that support webp on '/news/' iChef
const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const buildPlaceholderSrc = (src, resolution) => {
  const parts = src.split('/');
  const [domain, media, imgService, width, ...extraParts] = parts;
  const definedWidth = width.replace('$width', resolution);
  const domainWithProtocol = `https://${domain}`;

  const newUrl = [
    domainWithProtocol,
    media,
    imgService,
    definedWidth,
    ...extraParts,
  ];

  return newUrl.join('/');
};

const buildIChefURL = ({ originCode, locator, resolution, isWebP = false }) => {
  if (originCode === 'pips') {
    return locator;
  }

  if (originCode === 'mpv') {
    return buildPlaceholderSrc(locator, resolution);
  }

  const url = [
    process.env.SIMORGH_ICHEF_BASE_URL || 'https://ichef.bbci.co.uk',
    'news',
    resolution,
    originCode,
    locator,
  ].join('/');

  const isWebPSupported = isWebP && WEBP_ORIGIN_CODES.includes(originCode);

  if (isWebPSupported) {
    return `${url}.webp`;
  }

  return url;
};

export default buildIChefURL;
