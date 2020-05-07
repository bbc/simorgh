import buildIChefUrl from '#lib/utilities/ichefURL';

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
      `${buildIChefUrl({ originCode, locator, resolution })} ${resolution}w`,
  );

  return urls.join(', ');
};
export const getPlaceholderSrcSet = ({ originCode, locator }) => {
  if (!originCode) return '';
  if (!locator) return '';
  return DEFAULT_RESOLUTIONS.map(
    resolution =>
      `${buildIChefUrl({ originCode, locator, resolution })} ${resolution}w`,
  ).join(', ');
};
