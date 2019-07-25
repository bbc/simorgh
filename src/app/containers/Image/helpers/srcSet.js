import getIchefUrl from './ichefUrl';

const createSrcset = (
  originCode,
  locator,
  originalImageWidth,
  resolutions = [240, 320, 480, 624, 800],
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

export default createSrcset;
