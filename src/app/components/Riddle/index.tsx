/** @jsx jsx */
import { jsx } from '@emotion/react';
import onClient from '#app/lib/utilities/onClient';
import Card from './Components/Card';
import RiddleProvider from './RiddleProvider';
import DevControlPanel from './Components/DevControlPanel';
import LocalStorageProvider from './LocalStorageProvider';
import Placeholder from './Components/Placeholder';

export type CachedGameData = {
  goes: number;
  credits: number;
};

export default () => {
  const Game = (
    <LocalStorageProvider>
      <RiddleProvider>
        <Card />
        <DevControlPanel />
      </RiddleProvider>
    </LocalStorageProvider>
  );

  return onClient() ? Game : <Placeholder />;
};
