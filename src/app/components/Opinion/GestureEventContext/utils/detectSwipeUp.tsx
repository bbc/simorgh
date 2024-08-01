import { TouchPathType } from './TouchPathList';

const detectSwipeUp = (touchList: TouchPathType[]) => {
  const yDiffThreshold = 80;
  for (let i = 0; i < touchList.length; i += 1) {
    const { ypath } = touchList[0];

    if (ypath.length > 0) {
      const change = ypath[0] - ypath[ypath.length - 1];

      if (change >= yDiffThreshold) {
        console.log('UP DETECTED', change);
        return true;
      }
    }
  }

  return false;
};

export default detectSwipeUp;
