import React from 'react';
import Riddle from '.';
import ReadMeter from './Components/ReadMeter';

const Component = () => (
  <Riddle />
);

export default {
  title: 'Components/MyRiddleGame',
  Component,
};

export const Example = () => (
  <> 
    <Component />
    <ReadMeter />
  </>
)