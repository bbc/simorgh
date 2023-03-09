import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import Component from '.';
import ThemeProvider from '../../../components/ThemeProvider';

export default {
  title: 'Containers/Image with Placeholder',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

// Canonical
export const DefaultExample = () => (
  <ThemeProvider service="news">
    <ImageWithPlaceholder />
  </ThemeProvider>
);

export const WithALazyLoadedImage = () => (
  <ThemeProvider service="news">
    <LazyLoadImageWithPlaceholder />
  </ThemeProvider>
);

// Amp
export const AmpExample = () => (
  <ThemeProvider service="news">
    <AmpImageWithPlaceholder />
  </ThemeProvider>
);
AmpExample.decorators = [AmpDecorator];
