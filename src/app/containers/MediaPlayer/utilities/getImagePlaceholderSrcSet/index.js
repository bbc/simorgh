import buildIChefURL from '#lib/utilities/ichefURL';
import getDefaultImage from '../getDefaultImage';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

export default (originCode, locator) => {
  return DEFAULT_RESOLUTIONS.map(resolution => {
    const useDefault = !(originCode && locator);

    const image = useDefault
      ? getDefaultImage()
      : buildIChefURL({ originCode, locator, resolution });

    return `${image} ${resolution}w`;
  }).join(', ');
};
