import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GameData } from '../Components/Card';
import data from '../data';
import { LocalStorageContext } from '../LocalStorageProvider';

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
  funFact: 'Game Closed',
} as GameData;

export enum GameState {
  PLAY = 'PLAY',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
  WINNER = 'WINNER',
}

export type RiddleGameState = {
  gameIndex: number;
  gameState: GameState;
  gameData: GameData;
  updateGameState: Dispatch<SetStateAction<GameState>>;
  devTime: Date;
  forceTimeInc24: () => void;
  forceTimeDec24: () => void;
  submitAttempt: (str: string) => GameState;
  revealAnswer: (price: number) => void;
  devOptionResetGoes: () => void;
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
  const {
    resetHints,
    goes,
    reduceGoes,
    addGoes,
    isWinner,
    updateWinnerState,
    coins,
  } = use(LocalStorageContext);
  const [devTime, updateDevTime] = useState(new Date());
  const initialIndex = findCurrGameIndex();
  const [gameIndex, updateIndex] = useState(initialIndex);
  const gameData = gameIndex > -1 ? data[gameIndex] : defaultGameData;
  let initialGameState = gameIndex > -1 ? GameState.PLAY : GameState.CLOSED;
  if (goes <= 0 && isWinner === false) {
    initialGameState = GameState.FAILED;
  } else if (isWinner === true) {
    initialGameState = GameState.WINNER;
  }
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
        const updatedGameState =
          nextGameIndex > -1 ? GameState.PLAY : GameState.CLOSED;

        resetHints();
        updateIndex(nextGameIndex);
        updateGameState(updatedGameState);
        updateWinnerState(false);
        addGoes();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    addGoes,
    devTime,
    gameData.expire,
    gameState,
    resetHints,
    updateWinnerState,
  ]);

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
      const updatedGameState =
        nextGameIndex > -1 ? GameState.PLAY : GameState.CLOSED;

      updateDevTime(updatedDate);
      resetHints();
      updateIndex(nextGameIndex);
      updateGameState(updatedGameState);
      updateWinnerState(false);
      addGoes();
    };

    const submitAttempt = (submitString: string) => {
      let updatedGameState = GameState.PLAY;
      if (goes > 0) {
        const sanitised = submitString
          .toLowerCase() // Convert to lowercase
          .replace(/[^a-z0-9]/g, '');

        const { answer } = gameData;
        const myRegex = new RegExp(answer, 'gi');
        if (myRegex.exec(sanitised) !== null) {
          updateGameState(GameState.WINNER);
          updateWinnerState(true);
          updatedGameState = GameState.WINNER;
        } else if (myRegex.exec(sanitised) === null && goes === 1) {
          updateGameState(GameState.FAILED);
          updateWinnerState(false);
          updatedGameState = GameState.FAILED;
        }
        reduceGoes();
      }

      return updatedGameState;
    };

    const revealAnswer = (price: number) => {
      if (price <= coins) {
        updateGameState(GameState.WINNER);
        updateWinnerState(true);
      }
    };

    const devOptionResetGoes = () => {
      addGoes();
      if (gameState !== GameState.CLOSED) {
        updateGameState(GameState.PLAY);
      }
    };

    return {
      gameState,
      updateGameState,
      forceTimeInc24,
      forceTimeDec24,
      gameData,
      devTime,
      gameIndex,
      submitAttempt,
      revealAnswer,
      devOptionResetGoes,
    };
  }, [
    addGoes,
    coins,
    devTime,
    gameData,
    gameIndex,
    gameState,
    goes,
    reduceGoes,
    resetHints,
    updateWinnerState,
  ]);

  return (
    <RiddleContext.Provider value={value}>{children}</RiddleContext.Provider>
  );
};
