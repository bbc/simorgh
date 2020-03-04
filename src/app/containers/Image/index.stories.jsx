import { storiesOf } from '@storybook/react';
import React from 'react';
import ImageContainer from '.';
import { GridWrapper } from '#lib/styledGrid';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';

storiesOf('Containers|Image within grid', module)
  .addParameters({ chromatic: { disable: true } })
  .add('landscape image', () => (
    <GridWrapper>
      <ImageContainer {...imageData(landscape)} />
    </GridWrapper>
  ))
  .add('portrait image', () => (
    <GridWrapper>
      <ImageContainer {...imageData(portrait)} />
    </GridWrapper>
  ))
  .add('square image', () => (
    <GridWrapper>
      <ImageContainer {...imageData(square)} />
    </GridWrapper>
  ))
  .add('custom ratio image', () => (
    <GridWrapper>
      <ImageContainer {...imageData(custom)} />
    </GridWrapper>
  ));
