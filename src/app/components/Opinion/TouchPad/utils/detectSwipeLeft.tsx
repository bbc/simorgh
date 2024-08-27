import { TouchPathType } from './TouchPathList';

const detectSwipeLeft = (touchList: TouchPathType[], callback: () => void) => {
  const xDiffThreshold = 80;
  for (let i = 0; i < touchList.length; i += 1) {
    const { xpath } = touchList[i];

    if (xpath.length > 0) {
      const change = xpath[0] - xpath[xpath.length - 1];

      if (change >= xDiffThreshold) {
        callback();
        return true;
      }
    }
  }

  return false;
};

export default detectSwipeLeft;
