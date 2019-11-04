import { storiesOf } from '@storybook/react';
import React from 'react';
import ImageContainer from '.';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';
import { GelPageGrid } from '#app/components/Grid';

storiesOf('Containers|Image within GelPageGrid', module)
  .addParameters({ chromatic: { disable: true } })
  .add('landscape image', () => (
    <GelPageGrid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <ImageContainer {...imageData(landscape)} />
    </GelPageGrid>
  ))
  .add('portrait image', () => (
    <GelPageGrid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <ImageContainer {...imageData(portrait)} />
    </GelPageGrid>
  ))
  .add('square image', () => (
    <GelPageGrid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <ImageContainer {...imageData(square)} />
    </GelPageGrid>
  ))
  .add('custom ratio image', () => (
    <GelPageGrid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <ImageContainer {...imageData(custom)} />
    </GelPageGrid>
  ));
