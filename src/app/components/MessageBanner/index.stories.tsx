import React from 'react';

import MessageBanner from '.';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = ({ text = '', longText = '' }: Props) => {
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
  title: 'New Components/MessageBanner',
  Component,
};

export const Example = Component;
