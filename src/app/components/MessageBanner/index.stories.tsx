import React from 'react';

import withServicesKnob from '#app/utilities/withServicesDecorator';
import MessageBanner from '.';
import { StoryProps, UnusedFirstArg } from '../../models/types/storybook';
import md from './README.md';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = (_: UnusedFirstArg, { text = '', longText = '' }: Props) => {
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
  decorators: [withServicesKnob],
  parameters: {
    docs: {
      readme: md,
    },
  },
};

export const Example = Component;
