// List of originCodes that support webp on '/news/' iChef
const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const buildPlaceholderSrc = (src, resolution) => {
  // return urn schemes unmodified
  if (src.includes('urn:')) return src;
  const noProtocolSrc = src.replace('https://', '');
  const urlParts = noProtocolSrc.split('/');
  const [domain, mediaType, imgService, ...extraParts] = urlParts;
  // Slice use to cut off the old resolution
  const newExtraParts = extraParts.slice(1);
  const newResolution = `${resolution}xn`;
  const newUrl = [
    'https:/',
    domain,
    mediaType,
    imgService,
    newResolution,
    ...newExtraParts,
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
