import React from 'react';

import { FontVariant, GelFontSize } from '#app/models/types/theming';
import Text from '.';
import readme from './README.md';
import { StoryProps } from '../../models/types/storybook';

const EMPTY_OPTION = '--';

interface Props extends StoryProps {
  text: string;
  fontVariant: FontVariant | typeof EMPTY_OPTION;
  size: GelFontSize | typeof EMPTY_OPTION;
}

const TextStory = ({ text, fontVariant, size }: Props) => {
  return (
    <Text
      fontVariant={fontVariant !== EMPTY_OPTION ? fontVariant : undefined}
      size={size !== EMPTY_OPTION ? size : undefined}
    >
      {text}
    </Text>
  );
};

export default {
  title: 'Components/Text',
  Component: TextStory,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: { readme },
  },
  args: {
    text: 'This is a paragraph',
    fontVariant: EMPTY_OPTION,
    size: EMPTY_OPTION,
  },
  argTypes: {
    fontVariant: {
      control: { type: 'select' },
      options: [
        EMPTY_OPTION,
        'sansRegular',
        'sansRegularItalic',
        'sansBold',
        'sansBoldItalic',
        'sansLight',
        'serifRegular',
        'serifMedium',
        'serifMediumItalic',
        'serifBold',
        'serifLight',
      ],
    },
    size: {
      control: { type: 'select' },
      options: [
        EMPTY_OPTION,
        'atlas',
        'elephant',
        'imperial',
        'royal',
        'foolscap',
        'canon',
        'trafalgar',
        'paragon',
        'doublePica',
        'greatPrimer',
        'bodyCopy',
        'pica',
        'longPrimer',
        'brevier',
        'minion',
      ],
    },
  },
};

export const Example = TextStory;
