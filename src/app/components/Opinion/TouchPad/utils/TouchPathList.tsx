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

  clearTouchPathList = () => {
    this.touchList = [];
  };
}

export default TouchPathList;
