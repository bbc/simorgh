import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('ImageWithPlaceholder', module)
  .add('default', () => <ImageWithPlaceholder />)
  .add('with a lazyloaded image', () => <LazyLoadImageWithPlaceholder />);

storiesOf('ImageWithPlaceholder - AMP', module)
  .addDecorator(AmpDecorator)
  .add('default', () => <AmpImageWithPlaceholder />);
