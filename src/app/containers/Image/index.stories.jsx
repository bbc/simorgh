import { storiesOf } from '@storybook/react';
import React from 'react';
import ImageContainer from '.';
import { GhostGrid } from '../../lib/styledGrid';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';

storiesOf('Image container within grid', module)
  .add('landscape image', () => (
    <GhostGrid>
      <ImageContainer {...imageData(landscape)} />
    </GhostGrid>
  ))
  .add('portrait image', () => (
    <GhostGrid>
      <ImageContainer {...imageData(portrait)} />
    </GhostGrid>
  ))
  .add('square image', () => (
    <GhostGrid>
      <ImageContainer {...imageData(square)} />
    </GhostGrid>
  ))
  .add('custom ratio image', () => (
    <GhostGrid>
      <ImageContainer {...imageData(custom)} />
    </GhostGrid>
  ));
