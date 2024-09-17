import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';
import AmpDecorator from '#storybook/helpers/ampDecorator';
import Component from '.';

export default {
  title: 'Containers/Image with Placeholder',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

// Canonical
export const DefaultExample = ImageWithPlaceholder;
export const WithALazyLoadedImage = LazyLoadImageWithPlaceholder;

// Amp
export const AmpExample = AmpImageWithPlaceholder;
AmpExample.decorators = [AmpDecorator];
