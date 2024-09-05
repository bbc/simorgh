import detectSwipeDown from './detectSwipeDown';
import detectSwipeLeft from './detectSwipeLeft';
import detectSwipeRight from './detectSwipeRight';
import detectSwipeUp from './detectSwipeUp';

export type TouchPathType = {
  xpath: number[];
  ypath: number[];
};

class TouchPathList {
  touchList: TouchPathType[];

  constructor() {
    this.touchList = [];
  }

  initialiseTouchPathList = (event: React.TouchEvent<HTMLDivElement>) => {
    const startingTouchList: TouchPathType[] = [];
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i += 1) {
      startingTouchList.push({
        xpath: [touches[i].screenX],
        ypath: [touches[i].screenY],
      });
    }

    this.touchList = startingTouchList;
  };

  updateTouchPathList = (event: React.TouchEvent<HTMLDivElement>) => {
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i += 1) {
      const pathList = this.touchList[i];
      pathList.xpath.push(touches[i].screenX);
      pathList.ypath.push(touches[i].screenY);
    }
  };

  processTouches = ({
    swipeUp,
    swipeDown,
    swipeLeft,
    swipeRight,
  }: {
    swipeUp: () => void;
    swipeDown: () => void;
    swipeLeft: () => void;
    swipeRight: () => void;
  }) => {
    detectSwipeUp(this.touchList, swipeUp);
    detectSwipeDown(this.touchList, swipeDown);
    detectSwipeLeft(this.touchList, swipeLeft);
    detectSwipeRight(this.touchList, swipeRight);
  };

  clearTouchPathList = () => {
    this.touchList = [];
  };
}

export default TouchPathList;
