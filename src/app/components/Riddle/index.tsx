/** @jsx jsx */
import { jsx } from '@emotion/react';
import Card from './Components/Card';
import RiddleProvider from './RiddleProvider';
import DevControlPanel from './Components/DevControlPanel';

export type CachedGameData = {
  goes: number;
  credits: number;
};

export default () => {
  return (
    <RiddleProvider>
      <Card />
      <DevControlPanel />
    </RiddleProvider>
  );
};
