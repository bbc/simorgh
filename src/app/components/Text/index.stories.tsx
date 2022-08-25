import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import Text from '.';

interface Props {
  service:
    | 'afaanoromoo'
    | 'afrique'
    | 'amharic'
    | 'arabic'
    | 'archive'
    | 'azeri'
    | 'bengali'
    | 'burmese'
    | 'cymrufyw'
    | 'gahuza'
    | 'gujarati'
    | 'hausa'
    | 'hindi'
    | 'igbo'
    | 'indonesia'
    | 'japanese'
    | 'korean'
    | 'kyrgyz'
    | 'marathi'
    | 'mundo'
    | 'naidheachdan'
    | 'nepali'
    | 'news'
    | 'newsround'
    | 'pashto'
    | 'persian'
    | 'pidgin'
    | 'portuguese'
    | 'punjabi'
    | 'russian'
    | 'scotland'
    | 'serbian'
    | 'sinhala'
    | 'somali'
    | 'sport'
    | 'swahili'
    | 'tamil'
    | 'telugu'
    | 'thai'
    | 'tigrinya'
    | 'turkce'
    | 'ukchina'
    | 'ukrainian'
    | 'urdu'
    | 'uzbek'
    | 'vietnamese'
    | 'yoruba'
    | 'zhongwen';
  variant: null | 'cyr' | 'lat' | 'simp' | 'trad';
  text: string;
}

const Component = ({ service, variant, text }: Props) => (
  <ThemeProvider service={service} variant={variant}>
    <ServiceContextProvider service={service} variant={variant}>
      <Text
        fontVariant={select(
          'fontVariant',
          {
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
          'sansRegular',
        )}
        size={select(
          'size',
          {
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
          'pica',
        )}
      >
        {text}
      </Text>
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  title: 'NewComponents/Text',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = Component;
