import { getEnvConfig } from '../getEnvConfig';

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

const buildIChefURL = ({ originCode, locator, resolution }) => {
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

  return url.endsWith('.webp') ? url : `${url}.webp`;
};

export default buildIChefURL;
