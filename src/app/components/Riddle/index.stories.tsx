import React from 'react';
import Riddle from '.';
import LocalStorageProvider from './LocalStorageProvider';
import ReadMeter from './Components/ReadMeter';
import DevControlPanel from './Components/DevControlPanel';

const Component = () => (
  <Riddle />
);

export default {
  title: 'Components/MyRiddleGame',
  Component,
};

export const Example = () => (
  <LocalStorageProvider>
    <Component />
    <ReadMeter />
  </LocalStorageProvider>
)