/** @jsx jsx */
import { jsx } from '@emotion/react';
import onClient from '#app/lib/utilities/onClient';
import Card from './Components/Card';
import RiddleProvider from './RiddleProvider';
import DevControlPanel from './Components/DevControlPanel';
import Placeholder from './Components/Placeholder';

export type CachedGameData = {
  goes: number;
  credits: number;
};

export default () => {
  const Game = (
    <RiddleProvider>
      <Card />
      <DevControlPanel />
    </RiddleProvider>
  );

  return onClient() ? Game : <Placeholder />;
};
