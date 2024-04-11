import React from 'react';

import Billboard from '.';
import { StoryProps, StoryArgs } from '../../models/types/storybook';
import readme from './README.md';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = (_: StoryArgs, { text = '', longText = '' }: Props) => {
  return (
    <Billboard
      heading={text}
      description={longText}
      link="https://www.bbc.co.uk/ws/languages"
      image="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
      showLiveLabel
    />
  );
};

export default {
  title: 'Components/Billboard',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Example = Component;
