import React from 'react';

import { FontVariant, GelFontSize } from '#app/models/types/theming';
import Heading from '.';
import readme from './README.md';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text: string;
  level: 1 | 2 | 3 | 4;
  fontVariant: FontVariant | '--';
  size: GelFontSize | '--';
}

const EMPTY_OPTION = '--';

const HeadingStory = ({ text, level, fontVariant, size }: Props) => {
  return (
    <Heading
      level={level}
      fontVariant={fontVariant !== EMPTY_OPTION ? fontVariant : undefined}
      size={size !== EMPTY_OPTION ? size : undefined}
    >
      {text}
    </Heading>
  );
};

export default {
  title: 'Components/Heading',
  Component: HeadingStory,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: { readme },
  },
  args: {
    text: 'Heading',
    level: 1,
    fontVariant: EMPTY_OPTION,
    size: EMPTY_OPTION,
  },
  argTypes: {
    level: {
      control: {
        type: 'select',
      },
      options: [1, 2, 3, 4],
    },
    fontVariant: {
      control: {
        type: 'select',
      },
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
      control: {
        type: 'select',
      },
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

export const Example = HeadingStory;
