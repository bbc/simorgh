import React from 'react';

import { FontVariant, GelFontSize } from '#app/models/types/theming';
import Paragraph from '.';
// import md from './README.md';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text: string;
  fontVariant: FontVariant | '--';
  size: GelFontSize | '--';
}

const EMPTY_OPTION = '--';

const ParagraphStory = ({ text, fontVariant, size }: Props) => {
  return (
    <Paragraph
      fontVariant={fontVariant !== EMPTY_OPTION ? fontVariant : undefined}
      size={size !== EMPTY_OPTION ? size : undefined}
    >
      {text}
    </Paragraph>
  );
};

export default {
  title: 'New Components/Paragraph',
  Component: ParagraphStory,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: {
      component: {
        title: 'Paragraph',
      },
      // page: md,
    },
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

export const Example = ParagraphStory;
