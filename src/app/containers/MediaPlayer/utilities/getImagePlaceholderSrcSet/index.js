import buildIChefURL from '#lib/utilities/ichefURL';
import getDefaultImage from '../getDefaultImage';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

const useDefaultImage = (originCode, locator) => {
  return !(originCode && locator);
};

export default (originCode, locator) => {
  return DEFAULT_RESOLUTIONS.map(resolution => {
    let image = buildIChefURL({ originCode, locator, resolution });

    if (useDefaultImage(originCode, locator)) {
      image = getDefaultImage();
    }

    return `${image} ${resolution}w`;
  }).join(', ');
};
