import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { GameData } from '../Components/Card';
import data from '../data';

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
  nextGame: () => void;
  prevGame: () => void;
};

export const RiddleContext = createContext<RiddleGameState>(
  {} as RiddleGameState,
);

export default ({ children }: PropsWithChildren) => {
  const [gameState, updateGameState] = useState(GameState.PLAY);
  const [gameIndex, updateIndex] = useState(0);

  const nextGame = () => {
    updateIndex(0);
  };
  const prevGame = () => {
    updateIndex(0);
  };

  const gameData = data[gameIndex];

  const value = useMemo(
    () => ({ gameState, updateGameState, nextGame, prevGame, gameData }),
    [gameData, gameState],
  );

  return (
    <RiddleContext.Provider value={value}>{children}</RiddleContext.Provider>
  );
};
