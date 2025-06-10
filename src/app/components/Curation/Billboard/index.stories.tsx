import React from 'react';

import Billboard from '.';
import { StoryArgs } from '../../../models/types/storybook';
import metadata from './metadata.json';
import readme from './README.md';

interface Props {
  text?: string;
  longText?: string;
  showLiveLabel?: boolean;
}

const Component = ({
  text = '',
  longText = '',
  showLiveLabel = false,
}: Props) => {
  return (
    <Billboard
      heading={text}
      description={longText}
      link="https://www.bbc.co.uk/ws/languages"
      image="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
      showLiveLabel={showLiveLabel}
      altText="alt text"
    />
  );
};

export default {
  title: 'Components/Billboard',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = (_: StoryArgs, globalArgs: Props) => {
  const { text, longText } = globalArgs;

  return <Component text={text} longText={longText} />;
};

export const WithLiveLabel = (_: StoryArgs, globalArgs: Props) => {
  const { text, longText } = globalArgs;

  return <Component text={text} longText={longText} showLiveLabel />;
};
