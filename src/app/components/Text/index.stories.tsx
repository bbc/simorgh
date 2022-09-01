import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { Services } from '../../models/types/global';
import ThemeProvider from '../ThemeProvider';
import Text from '.';

interface Props {
  service: Services;
  variant: null | 'cyr' | 'lat' | 'simp' | 'trad';
  text: string;
}

const TextStory = ({ service, variant, text }: Props) => (
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
  Component: TextStory,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = TextStory;
