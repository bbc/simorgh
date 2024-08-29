import { TouchPathType } from '.';

const detectSwipeUp = (touchList: TouchPathType[], callback: () => void) => {
  const yDiffThreshold = 80;
  for (let i = 0; i < touchList.length; i += 1) {
    const { ypath } = touchList[i];

    if (ypath.length > 0) {
      const change = ypath[0] - ypath[ypath.length - 1];

      if (change >= yDiffThreshold) {
        callback();
        return true;
      }
    }
  }

  return false;
};

export default detectSwipeUp;
