import React from 'react';

import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import ThemeProvider from '../ThemeProvider';
import Image from '.';
import md from './README.md';

const BasicImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    />
  </ThemeProvider>
);

export default {
  title: 'New Components/Image',
  Component: BasicImage,
  parameters: {
    chromatic: { disable: true },
    docs: {
      component: {
        title: 'Image',
      },
      page: md,
    },
  },
};

export const ResponsiveImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
      srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    />
  </ThemeProvider>
);

export const ResponsiveWebPWithJpegFallback = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
      srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
      mediaType="image/webp"
      fallbackSrcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
      fallbackMediaType="image/jpeg"
    />
  </ThemeProvider>
);

export const BasicAMPImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    />
  </ThemeProvider>
);

export const ResponsiveAMPImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
      srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    />
  </ThemeProvider>
);

export const AMPWebPWithJpegFallback = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="A penguin stands on an ice floe"
      src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
      srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
      mediaType="image/webp"
      fallbackSrcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
      fallbackMediaType="image/jpeg"
    />
  </ThemeProvider>
);

BasicAMPImage.decorators = [AmpDecorator];
ResponsiveAMPImage.decorators = [AmpDecorator];
AMPWebPWithJpegFallback.decorators = [AmpDecorator];
