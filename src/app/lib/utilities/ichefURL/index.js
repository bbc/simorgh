import { getEnvConfig } from '../getEnvConfig';

// List of originCodes that support webp on '/ace/ws/' iChef
const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const buildPlaceholderSrc = (src, resolution) => {
  const imageSrc =
    src || 'https://ichef.bbci.co.uk/images/ic/640xn/p0b36kgx.png';
  if (imageSrc.includes('urn:') || imageSrc.includes('localhost:'))
    return imageSrc;
  const urlParts = imageSrc.replace(/https?:\/\//g, '').split('/');
  const [domain, mediaType, imgService, ...remainingUrlParts] = urlParts;
  const remainingUrlPartsWithoutResolution = remainingUrlParts.slice(1);
  const newResolution = `${resolution}xn`;
  const newUrl = [
    domain,
    mediaType,
    imgService,
    newResolution,
    ...remainingUrlPartsWithoutResolution,
  ];
  return `https://${newUrl.join('/')}`;
};

const buildIChefURL = ({ originCode, locator, resolution, isWebP = false }) => {
  if (originCode === 'mpv' || originCode === 'pips') {
    return buildPlaceholderSrc(locator, resolution);
  }

  const url = [
    getEnvConfig().SIMORGH_ICHEF_BASE_URL || 'https://ichef.bbci.co.uk',
    'ace',
    'ws',
    resolution,
    originCode,
    locator,
  ]
    .filter(Boolean)
    .join('/');

  const isWebPSupported = isWebP && WEBP_ORIGIN_CODES.includes(originCode);

  if (isWebPSupported) {
    return `${url}.webp`;
  }

  return url;
};

export default buildIChefURL;
