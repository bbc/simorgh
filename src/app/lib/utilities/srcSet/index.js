import buildIChefUrl from '#lib/utilities/ichefURL';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

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
    return { primarySrcset: undefined, fallbackSrcset: undefined };
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

  // eslint-disable-next-line prefer-const
  let [primarySrcset, fallbackSrcset] = [true, false].map(isWebP =>
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
  fallbackSrcset = fallbackSrcset.replaceAll('.webp', '');

  return {
    primarySrcset,
    primaryMimeType: getMimeType(primarySrcset),
    fallbackSrcset,
    fallbackMimeType: getMimeType(fallbackSrcset),
  };
};
export const getPlaceholderSrcSet = ({ originCode, locator, isWebP }) => {
  if (!originCode || !locator) return '';
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
