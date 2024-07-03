import React from 'react';
import Transcript from '.';
import transcriptFixture from './fixture.json';
// import { StoryProps, StoryArgs } from '../../models/types/storybook';

const Component = () => {
  return (
    <Transcript transcript={transcriptFixture} title="Title of my video" />
  );
};

export default {
  title: 'Components/Transcript',
  Component,
};

export const Example = Component;
