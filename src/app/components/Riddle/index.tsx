import { useEffect, useState } from 'react';
import Card from './Components/Card';
import RiddleProvider from './RiddleProvider';
import DevControlPanel from './Components/DevControlPanel';
import Placeholder from './Components/Placeholder';

export type CachedGameData = {
  goes: number;
  credits: number;
};

export default () => {
  const [isReadyToLoad, setReadyToLoad] = useState(false);
  const Game = (
    <RiddleProvider>
      <Card />
      <DevControlPanel />
    </RiddleProvider>
  );

  useEffect(() => {
    setReadyToLoad(true);
  }, []);

  return isReadyToLoad ? Game : <Placeholder />;
};
