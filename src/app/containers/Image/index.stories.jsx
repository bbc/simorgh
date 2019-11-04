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

storiesOf('Containers|Image within grid', module)
  .addParameters({ chromatic: { disable: true } })
  .add('landscape image', () => <ImageContainer {...imageData(landscape)} />)
  .add('portrait image', () => <ImageContainer {...imageData(portrait)} />)
  .add('square image', () => <ImageContainer {...imageData(square)} />)
  .add('custom ratio image', () => <ImageContainer {...imageData(custom)} />);
