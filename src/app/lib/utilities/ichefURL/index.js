// List of originCodes that support webp on '/news/' iChef
const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const buildPlaceholderSrc = (src, resolution) => {
  // return standard img url pips
  if (src.includes('urn:')) return src;
  const noProtocolSrc = src.replace('https://', '');
  const parts = noProtocolSrc.split('/');
  const [domain, media, imgService, ...extraParts] = parts;
  // shift is used to delete the old resolution.
  extraParts.shift();
  const definedResolution = `${resolution}xn`;
  const domainWithProtocol = `https://${domain}`;
  const newUrl = [
    domainWithProtocol,
    media,
    imgService,
    definedResolution,
    ...extraParts,
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
