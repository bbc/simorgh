import buildIChefURL from '#lib/utilities/ichefURL';
import getDefaultImage from '../getDefaultImage';

const DEFAULT_RESOLUTION = '512';

export default (originCode, locator) => {
  if (originCode && locator) {
    return buildIChefURL({
      originCode,
      locator,
      resolution: DEFAULT_RESOLUTION,
    });
  }
  return getDefaultImage();
};
