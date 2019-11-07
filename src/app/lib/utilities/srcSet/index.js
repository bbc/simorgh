import getIchefUrl from './ichefUrl';
import getPlaceholderSrc from './placeholder';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

export const createSrcset = (
  originCode,
  locator,
  originalImageWidth,
  resolutions = DEFAULT_RESOLUTIONS,
) => {
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

  const urls = requiredResolutions.map(
    resolution =>
      `${getIchefUrl(originCode, locator, resolution)} ${resolution}w`,
  );

  return urls.join(', ');
};

export const getPlaceholderSrcSet = src =>
  DEFAULT_RESOLUTIONS.map(
    resolution => `${getPlaceholderSrc(src, resolution)} ${resolution}w`,
  ).join(', ');
