import { storiesOf } from '@storybook/react';
import React from 'react';
import ImageContainer from '.';
import { GhostWrapper } from '../../lib/styledGrid';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';

storiesOf('Image container within grid', module)
  .add('landscape image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(landscape)} />
    </GhostWrapper>
  ))
  .add('portrait image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(portrait)} />
    </GhostWrapper>
  ))
  .add('square image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(square)} />
    </GhostWrapper>
  ))
  .add('custom ratio image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(custom)} />
    </GhostWrapper>
  ));
