// List of originCodes that support webp on '/news/' iChef
const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const buildPlaceholderSrc = (src, resolution) => {
  if (src.includes('urn:')) return src;
  const urlParts = src.replace('https://', '').split('/');
  const [domain, mediaType, imgService, ...remainingUrlParts] = urlParts;
  // Slice use to cut off the old resolution
  const remainingUrlPartsWithoutResolution = remainingUrlParts.slice(1);
  const newResolution = `${resolution}xn`;
  const newUrl = [
    'https:/',
    domain,
    mediaType,
    imgService,
    newResolution,
    ...remainingUrlPartsWithoutResolution,
  ];
  return newUrl.join('/');
};

const buildIChefURL = ({ originCode, locator, resolution, isWebP = false }) => {
  if (originCode === 'mpv' || originCode === 'pips') {
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
