import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import TouchPathList from './utils/TouchPathList';
import detectSwipeUp from './utils/detectSwipeUp';

export type GestureEventContextType = {
  swipeUpCount: number;
  setSwipeUpCount: Dispatch<SetStateAction<number>>;
  swipeDownCount: number;
  setSwipeDownCount: Dispatch<SetStateAction<number>>;
  swipeLeftCount: number;
  setSwipeLeftCount: Dispatch<SetStateAction<number>>;
  swipeRightCount: number;
  setSwipeRightCount: Dispatch<SetStateAction<number>>;
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

  return (
    <Context.Provider
      value={{
        swipeUpCount,
        setSwipeUpCount,
        swipeDownCount,
        setSwipeDownCount,
        swipeLeftCount,
        setSwipeLeftCount,
        swipeRightCount,
        setSwipeRightCount,
      }}
    >
      <TouchPad>{children}</TouchPad>
    </Context.Provider>
  );
};

export const useGestureEventContext = () =>
  useContext<GestureEventContextType>(Context);

export default GestureEventContext;
