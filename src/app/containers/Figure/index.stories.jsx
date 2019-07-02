import { storiesOf } from '@storybook/react';
import {
  FigureImage,
  FigureAmpImage,
  FigureLazyLoadImage,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Figure', module)
  .add('default', () => FigureImage)
  .add('without a caption', () => FigureImage)
  .add('with a lazyloaded image', () => FigureLazyLoadImage);

storiesOf('Figure - AMP', module)
  .addDecorator(AmpDecorator)
  .add('default', () => FigureAmpImage);
