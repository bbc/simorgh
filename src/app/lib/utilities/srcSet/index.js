import buildIChefUrl from '#lib/utilities/ichefURL';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

export const createSrcsets = ({
  originCode,
  locator,
  originalImageWidth,
  resolutions = DEFAULT_RESOLUTIONS,
}) => {
  if (originCode === 'pips') {
    return null;
  }

  const requiredResolutions = resolutions.filter(
    resolution => resolution <= originalImageWidth,
  );

  if (
    originalImageWidth < resolutions[resolutions.length - 1] &&
    !requiredResolutions.includes(originalImageWidth)
  ) {
    requiredResolutions.push(originalImageWidth);
  }

  const webpSrcset = requiredResolutions
    .map(
      resolution =>
        `${buildIChefUrl({
          originCode,
          locator,
          resolution,
          isWebP: true,
        })} ${resolution}w`,
    )
    .join(', ');

  const fallbackSrcset = requiredResolutions
    .map(
      resolution =>
        `${buildIChefUrl({
          originCode,
          locator,
          resolution,
          isWebP: false,
        })} ${resolution}w`,
    )
    .join(', ');

  return { webpSrcset, fallbackSrcset };
};
export const getPlaceholderSrcSet = ({ originCode, locator, isWebP }) => {
  if (!originCode) return '';
  if (!locator) return '';
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
