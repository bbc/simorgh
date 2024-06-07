import React from 'react';
import Transcript from '.';
import transcriptFixture from './fixture.json';
// import { StoryProps, StoryArgs } from '../../models/types/storybook';

const Component = (transcript: any) => {
  return <Transcript transcript={transcriptFixture} />;
};

export default {
  title: 'Components/Transcript',
  Component,
};

export const Example = Component;
