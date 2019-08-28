import { storiesOf } from '@storybook/react';
import React from 'react';
import { Grid } from '@lib/styledGrid';
import ImageContainer from '.';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';

storiesOf('Containers|Image within grid', module)
  .add('landscape image', () => (
    <Grid>
      <ImageContainer {...imageData(landscape)} />
    </Grid>
  ))
  .add('portrait image', () => (
    <Grid>
      <ImageContainer {...imageData(portrait)} />
    </Grid>
  ))
  .add('square image', () => (
    <Grid>
      <ImageContainer {...imageData(square)} />
    </Grid>
  ))
  .add('custom ratio image', () => (
    <Grid>
      <ImageContainer {...imageData(custom)} />
    </Grid>
  ));
