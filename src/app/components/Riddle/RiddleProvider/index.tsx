import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GameData } from '../Components/Card';
import data from '../data';

const defaultGameData = {
  expire: '2024-12-31T23:59:59+00:00',
  question: 'Game Closed',
  hint1: {
    title: 'Game Closed',
    hintText: 'Game Closed',
    price: 0,
  },
  hint2: {
    title: 'Game Closed',
    hintText: 'Game Closed',
    price: 0,
  },
  answer: 'Game Closed',
} as GameData;

export enum GameState {
  PLAY,
  CLOSED,
  FAILED,
  WINNER,
}

export type RiddleGameState = {
  gameState: GameState;
  gameData: GameData;
  updateGameState: Dispatch<SetStateAction<GameState>>;
  devTime: Date;
  forceTimeInc24: () => void;
  forceTimeDec24: () => void;
};

export const RiddleContext = createContext<RiddleGameState>(
  {} as RiddleGameState,
);

const findCurrGameIndex = (forcedDate?: Date) => {
  return data.findIndex(riddleData => {
    const currTime = forcedDate ?? new Date();
    const currEpoch = currTime.getTime();
    const riddleExpiry = new Date(riddleData.expire).getTime();
    if (currEpoch < riddleExpiry) {
      return true;
    }
    return false;
  });
};

export default ({ children }: PropsWithChildren) => {
  const [devTime, updateDevTime] = useState(new Date());
  const initialIndex = findCurrGameIndex();
  const [gameIndex, updateIndex] = useState(initialIndex);
  const gameData = gameIndex > -1 ? data[gameIndex] : defaultGameData;
  const initialGameState = gameIndex > -1 ? GameState.PLAY : GameState.CLOSED;
  const [gameState, updateGameState] = useState(initialGameState);

  useEffect(() => {
    const timer = setInterval(() => {
      const devCurrTime = new Date(devTime);
      const updatedTimeStamp = devCurrTime.setSeconds(
        devCurrTime.getSeconds() + 1,
      );

      const updatedTime = new Date(updatedTimeStamp);
      const expiryTime = new Date(gameData.expire);
      updateDevTime(updatedTime);

      if (
        gameState !== GameState.CLOSED &&
        updatedTime.getTime() > expiryTime.getTime()
      ) {
        const nextGameIndex = findCurrGameIndex(updatedTime);
        updateIndex(nextGameIndex);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [devTime, gameData.expire, gameState]);

  const value = useMemo(() => {
    const forceTimeInc24 = () => {
      const updatedDateStamp = devTime.setDate(devTime.getDate() + 1);
      const updatedDate = new Date(updatedDateStamp);
      updateDevTime(updatedDate);
    };

    const forceTimeDec24 = () => {
      const updatedDateStamp = devTime.setDate(devTime.getDate() - 1);
      const updatedDate = new Date(updatedDateStamp);
      const nextGameIndex = findCurrGameIndex(updatedDate);

      updateIndex(nextGameIndex);
      updateDevTime(updatedDate);
    };

    return {
      gameState,
      updateGameState,
      forceTimeInc24,
      forceTimeDec24,
      gameData,
      devTime,
    };
  }, [devTime, gameData, gameState]);

  return (
    <RiddleContext.Provider value={value}>{children}</RiddleContext.Provider>
  );
};
