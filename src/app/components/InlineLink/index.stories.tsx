import React from 'react';

import { StoryProps, StoryArgs } from '../../models/types/storybook';
import InlineLink from '.';
import Text from '../Text';
import readme from './README.md';

interface Props extends StoryProps {
  children: React.ReactNode;
  text: string;
}

export const InternalInlineLink = (
  _: StoryArgs,
  { text }: Omit<Props, 'children'>,
) => <InlineLink to="https://www.bbc.com/mundo" text={text} />;

export const ExternalInlineLink = (
  _: StoryArgs,
  { text }: Omit<Props, 'children'>,
) => <InlineLink to="https://google.com" text={text} />;

export const InlineLinkWithTypographyStyles = (
  _: StoryArgs,
  { text }: Omit<Props, 'children'>,
) => <InlineLink to="/" text={text} fontVariant="serifBold" size="elephant" />;

export const InlineLinkInsideText = (
  _: StoryArgs,
  { text }: Omit<Props, 'children'>,
) => {
  const words = text.split(' ');
  const middleIndex = Math.ceil(words.length / 2) - 1;
  const middleWord = words[middleIndex];

  return (
    <Text>
      {words.slice(0, middleIndex).join(' ')}
      &nbsp;
      <InlineLink to="/igbo/articles/ceqnwl68n3qo" text={middleWord} />
      &nbsp;
      {words.slice(middleIndex + 1).join(' ')}
    </Text>
  );
};

export default {
  title: 'Components/InlineLink',
  Component: InternalInlineLink,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: { readme },
  },
};
