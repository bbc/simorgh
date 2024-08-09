import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

export type TouchEventContextType = {
  swipeUpCount: number;
  swipeUp: () => void;
  swipeDownCount: number;
  swipeDown: () => void;
  swipeLeftCount: number;
  swipeLeft: () => void;
  swipeRightCount: number;
  swipeRight: () => void;
};

const Context = createContext<TouchEventContextType>(
  {} as TouchEventContextType,
);

const TouchPadContext = ({ children }: PropsWithChildren) => {
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
      {children}
    </Context.Provider>
  );
};

export const useTouchEventContext = () =>
  useContext<TouchEventContextType>(Context);

export default TouchPadContext;
