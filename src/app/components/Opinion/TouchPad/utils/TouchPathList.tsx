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
    const startingTouchList = [];
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

  processTouches = () => {
    detectSwipeUp(this.touchList, () => {
      console.log('UP DETECTED');
    });

    detectSwipeDown(this.touchList, () => {
      console.log('DOWN DETECTED');
    });

    detectSwipeLeft(this.touchList, () => {
      console.log('LEFT DETECTED');
    });

    detectSwipeRight(this.touchList, () => {
      console.log('RIGHT DETECTED');
    });
  };

  clearTouchPathList = () => {
    this.touchList = [];
  };
}

export default TouchPathList;
