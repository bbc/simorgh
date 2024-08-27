import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type FunctionStack = (() => void)[];
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

  useEffect(() => {
    console.log('HANDLE UP');
  }, [swipeUpCount]);
  useEffect(() => {
    console.log('HANDLE Down');
  }, [swipeDownCount]);
  useEffect(() => {
    console.log('HANDLE Left');
  }, [swipeLeftCount]);
  useEffect(() => {
    console.log('HANDLE Right');
  }, [swipeRightCount]);

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
      {children}
    </Context.Provider>
  );
};

export const useTouchEventContext = () =>
  useContext<TouchEventContextType>(Context);

export default TouchPadContext;
