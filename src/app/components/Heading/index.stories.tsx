import React from 'react';

import Heading from '.';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text: string;
}

const EMPTY_OPTION = '--';

const HeadingStory = {
  render: ({ text }: Props, { args }: { args: any }) => {
    const selectedLevel = args?.level;

    const selectedFontVariant = args?.fontVariant;
    const selectedSize = args?.size;

    return (
      <Heading
        level={selectedLevel}
        fontVariant={
          selectedFontVariant !== EMPTY_OPTION ? selectedFontVariant : undefined
        }
        size={selectedSize !== EMPTY_OPTION ? selectedSize : undefined}
      >
        {text}
      </Heading>
    );
  },
  args: {
    text: 'Heading',
    level: 1,
    fontVariant: EMPTY_OPTION,
    size: EMPTY_OPTION,
  },
};

export default {
  title: 'New Components/Heading',
  Component: HeadingStory,
  argTypes: {
    level: {
      options: [1, 2, 3, 4],
      control: { type: 'select' },
    },
    fontVariant: {
      options: [
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
      control: { type: 'select' },
    },
    size: {
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
      control: { type: 'select' },
    },
  },
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = HeadingStory;
