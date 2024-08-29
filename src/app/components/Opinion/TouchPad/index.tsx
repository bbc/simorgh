/** @jsx jsx */
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { jsx } from '@emotion/react';
import TouchPathList from './TouchPathList';
import styles from './index.style';
import useSwipeObservable from './hooks/useSwipeObserverable';

export type FunctionStack = (() => void)[];
export type TouchEventContextType = {
  swipeUpStack: FunctionStack;
  swipeUp: () => void;
  swipeDownStack: FunctionStack;
  swipeDown: () => void;
  swipeLeftStack: FunctionStack;
  swipeLeft: () => void;
  swipeRightStack: FunctionStack;
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

  const swipeUpStack: FunctionStack = [];
  const swipeDownStack: FunctionStack = [];
  const swipeLeftStack: FunctionStack = [];
  const swipeRightStack: FunctionStack = [];

  const touchList = new TouchPathList();

  useSwipeObservable(swipeUpStack, swipeUpCount);
  useSwipeObservable(swipeDownStack, swipeDownCount);
  useSwipeObservable(swipeLeftStack, swipeLeftCount);
  useSwipeObservable(swipeRightStack, swipeRightCount);

  return (
    <Context.Provider
      value={{
        swipeUpStack,
        swipeUp,
        swipeDownStack,
        swipeDown,
        swipeLeftStack,
        swipeLeft,
        swipeRightStack,
        swipeRight,
      }}
    >
      <div
        onTouchStart={e => {
          touchList.initialiseTouchPathList(e);
        }}
        onTouchEnd={e => {
          touchList.updateTouchPathList(e);
          touchList.processTouches({
            swipeUp,
            swipeDown,
            swipeLeft,
            swipeRight,
          });
          touchList.clearTouchPathList();
        }}
        css={styles.touchPadArea}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

export const useTouchEventContext = () =>
  useContext<TouchEventContextType>(Context);

export default TouchPadContext;
