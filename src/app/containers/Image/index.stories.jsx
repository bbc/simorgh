import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import ImageContainer from '.';
import { GhostWrapper } from '../../lib/styledGrid';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
  smallCustom,
  smallLandscape,
  smallPortrait,
  smallSquare,
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
  ))
  .add('small landscape image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(smallLandscape)} />
    </GhostWrapper>
  ))
  .add('small portrait image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(smallPortrait)} />
    </GhostWrapper>
  ))
  .add('small square image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(smallSquare)} />
    </GhostWrapper>
  ))
  .add('small custom ratio image', () => (
    <GhostWrapper>
      <ImageContainer {...imageData(smallCustom)} />
    </GhostWrapper>
  ));
