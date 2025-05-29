import React from 'react';
import { StoryArgs, StoryProps } from '../../models/types/storybook';
import PortraitVideoCarousel from '.';
import readme from './README.md';
import metadata from './metadata.json';
import portraitVideoFixture from './fixture';

// Suppressing for now but might require this later
 
interface Props extends StoryProps {}

const Component = (_: StoryArgs, __: Props) => {
  return (
    <PortraitVideoCarousel
      title={portraitVideoFixture.title}
      items={portraitVideoFixture.items}
    />
  );
};

export default {
  title: 'Components/PortraitVideoCarousel',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = Component;
