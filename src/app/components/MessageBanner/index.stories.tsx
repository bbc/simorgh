import React from 'react';

import { StoryProps, StoryArgs } from '#models/types/storybook';
import MessageBanner from '.';
import readme from './README.md';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = (_: StoryArgs, { text = '', longText = '' }: Props) => {
  return (
    <MessageBanner
      heading={text}
      description={longText}
      link="https://www.bbc.co.uk/ws/languages"
      linkText={text}
      image="https://ichef.bbci.co.uk/ace/standard/raw/cpsprodpb/e329/live/0a700dd0-7cb3-11ee-a503-4588075e3427.png"
    />
  );
};

export default {
  title: 'Components/MessageBanner',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Example = Component;
