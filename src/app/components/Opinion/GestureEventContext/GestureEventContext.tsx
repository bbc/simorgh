import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import TouchPathList from './utils/TouchPathList';
import detectSwipeUp from './utils/detectSwipeUp';

export type GestureEventContextType = {
  swipeUpCount: number;
  swipeUp: () => void;
  swipeDownCount: number;
  swipeDown: () => void;
  swipeLeftCount: number;
  swipeLeft: () => void;
  swipeRightCount: number;
  swipeRight: () => void;
};

const Context = createContext<GestureEventContextType>(
  {} as GestureEventContextType,
);

const TouchPad = ({ children }: PropsWithChildren) => {
  const touchList = new TouchPathList();

  return (
    <div
      onTouchStart={e => {
        touchList.initialiseTouchPathList(e);
      }}
      onTouchEnd={e => {
        touchList.updateTouchPathList(e);
        detectSwipeUp(touchList.touchList);
        touchList.clearTouchPathList();
      }}
    >
      {children}
    </div>
  );
};

const GestureEventContext = ({ children }: PropsWithChildren) => {
  const [swipeUpCount, setSwipeUpCount] = useState(0);
  const [swipeDownCount, setSwipeDownCount] = useState(0);
  const [swipeLeftCount, setSwipeLeftCount] = useState(0);
  const [swipeRightCount, setSwipeRightCount] = useState(0);

  const swipeUp = () => setSwipeUpCount(count => count + 1);
  const swipeDown = () => setSwipeDownCount(count => count + 1);
  const swipeLeft = () => setSwipeLeftCount(count => count + 1);
  const swipeRight = () => setSwipeRightCount(count => count + 1);

  return (
    <Context.Provider
      value={{
        swipeUpCount,
        swipeUp,
        swipeDownCount,
        swipeDown,
        swipeLeftCount,
        swipeLeft,
        swipeRightCount,
        swipeRight,
      }}
    >
      <TouchPad>{children}</TouchPad>
    </Context.Provider>
  );
};

export const useGestureEventContext = () =>
  useContext<GestureEventContextType>(Context);

export default GestureEventContext;
