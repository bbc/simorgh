import React from 'react';

import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import ThemeProvider from '../ThemeProvider';
import Image from '.';

export const BasicImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
    />
  </ThemeProvider>
);

export default {
  title: 'New Components/Image',
  Component: BasicImage,
  parameters: { chromatic: { disable: true } },
};

export const ResponsiveImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
      srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
    />
  </ThemeProvider>
);

export const ResponsiveWebPWithJpegFallback = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp"
      srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
      mediaType="image/webp"
      fallbackSrcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
      fallbackMediaType="image/jpeg"
    />
  </ThemeProvider>
);

export const BasicAMPImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
      width={500}
      height={281}
    />
  </ThemeProvider>
);

export const ResponsiveAMPImage = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
      srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
      width={500}
      height={281}
    />
  </ThemeProvider>
);

export const AMPWebPWithJpegFallback = () => (
  <ThemeProvider service="mundo" variant="default">
    <Image
      isAmp
      alt="orange 1"
      src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
      srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
      mediaType="image/webp"
      fallbackSrcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
      fallbackMediaType="image/jpeg"
      width={500}
      height={281}
    />
  </ThemeProvider>
);

BasicAMPImage.decorators = [AmpDecorator];
ResponsiveAMPImage.decorators = [AmpDecorator];
AMPWebPWithJpegFallback.decorators = [AmpDecorator];
