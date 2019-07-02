import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  FigureImage,
  FigureAmpImage,
  FigureLazyLoadImage,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('ImageWithPlaceholder', module)
  .add('default', () => <FigureImage />)
  .add('with a lazyloaded image', () => <FigureLazyLoadImage />);

storiesOf('ImageWithPlaceholder - AMP', module)
  .addDecorator(AmpDecorator)
  .add('default', () => <FigureAmpImage />);
