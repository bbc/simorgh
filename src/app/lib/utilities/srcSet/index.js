import buildIChefUrl from '#lib/utilities/ichefURL';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];
const PIPS_RESOLUTIONS = [
  [320, 180],
  [384, 216],
  [432, 243],
  [480, 270],
  [512, 288],
  [608, 342],
  [640, 360],
  [688, 387],
  [720, 405],
  [768, 432],
  [800, 450],
  [832, 468],
  [976, 549],
  [1024, 576],
  [1376, 774],
  [1920, 1080],
];

export const getMimeType = srcset => {
  if (!srcset || typeof srcset !== 'string') return null;

  const [firstSrcset] = srcset.split(',');
  const [firstSrcsetUrl] = firstSrcset.split(' ');
  const urlFileExtension = firstSrcsetUrl.split('.').pop();

  switch (urlFileExtension) {
    case 'webp':
      return 'image/webp';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return null;
  }
};

export const createSrcsets = ({
  originCode,
  locator,
  originalImageWidth,
  imageResolutions = DEFAULT_RESOLUTIONS,
}) => {
  if (originCode === 'pips') {
    return { primarySrcset: null, fallbackSrcset: null };
  }

  const requiredResolutions = imageResolutions.filter(
    resolution => resolution <= originalImageWidth,
  );

  if (
    originalImageWidth < imageResolutions[imageResolutions.length - 1] &&
    !requiredResolutions.includes(originalImageWidth)
  ) {
    requiredResolutions.push(originalImageWidth);
  }

  const [primarySrcset, fallbackSrcset] = [true, false].map(isWebP =>
    requiredResolutions
      .map(
        resolution =>
          `${buildIChefUrl({
            originCode,
            locator,
            resolution,
            isWebP,
          })} ${resolution}w`,
      )
      .join(', '),
  );

  return {
    primarySrcset,
    primaryMimeType: getMimeType(primarySrcset),
    fallbackSrcset,
    fallbackMimeType: getMimeType(fallbackSrcset),
  };
};
export const getPlaceholderSrcSet = ({ originCode, locator, isWebP }) => {
  if (!originCode || !locator) return '';
  if (originCode === 'pips') {
    return PIPS_RESOLUTIONS.map(
      resolution =>
        `${buildIChefUrl({
          originCode,
          locator,
          resolution,
          isWebP,
        })} ${resolution[0]}w`,
    ).join(', ');
  }
  return DEFAULT_RESOLUTIONS.map(
    resolution =>
      `${buildIChefUrl({
        originCode,
        locator,
        resolution,
        isWebP,
      })} ${resolution}w`,
  ).join(', ');
};
