import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import Text from '.';
import md from './README.md';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text: string;
}

const EMPTY_OPTION = '--';

const TextStory = ({ service, variant, text }: Props) => {
  const selectedFontVariant = select(
    'fontVariant',
    {
      [EMPTY_OPTION]: EMPTY_OPTION,
      sansRegular: 'sansRegular',
      sansRegularItalic: 'sansRegularItalic',
      sansBold: 'sansBold',
      sansBoldItalic: 'sansBoldItalic',
      sansLight: 'sansLight',
      serifRegular: 'serifRegular',
      serifMedium: 'serifMedium',
      serifMediumItalic: 'serifMediumItalic',
      serifBold: 'serifBold',
      serifLight: 'serifLight',
    },
    EMPTY_OPTION,
  );
  const selectedSize = select(
    'size',
    {
      [EMPTY_OPTION]: EMPTY_OPTION,
      atlas: 'atlas',
      elephant: 'elephant',
      imperial: 'imperial',
      royal: 'royal',
      foolscap: 'foolscap',
      canon: 'canon',
      trafalgar: 'trafalgar',
      paragon: 'paragon',
      doublePica: 'doublePica',
      greatPrimer: 'greatPrimer',
      bodyCopy: 'bodyCopy',
      pica: 'pica',
      longPrimer: 'longPrimer',
      brevier: 'brevier',
      minion: 'minion',
    },
    EMPTY_OPTION,
  );

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Text
          fontVariant={
            selectedFontVariant !== EMPTY_OPTION
              ? selectedFontVariant
              : undefined
          }
          size={selectedSize !== EMPTY_OPTION ? selectedSize : undefined}
        >
          {text}
        </Text>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Text',
  Component: TextStory,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: {
      component: {
        title: 'Text',
      },
      page: md,
    },
  },
};

export const Example = TextStory;
