import React from 'react';

import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import ThemeProvider from '../ThemeProvider';
import Heading from '../Heading';
import Image from '.';

const BasicImage = () => (
  <Image
    alt="orange 1"
    src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
  />
);

const ResponsiveImage = () => (
  <Image
    alt="orange 1"
    src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
    srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
  />
);

const ResponsiveWebPWithJpegFallback = () => (
  <Image
    alt="orange 1"
    src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp"
    srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
    mediaType="image/webp"
    fallbackSrcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
    fallbackMediaType="image/jpeg"
  />
);

const BasicAMPImage = () => (
  <Image
    isAmp
    alt="orange 1"
    src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
    width={500}
    height={281}
  />
);

const ResponsiveAMPImage = () => (
  <Image
    isAmp
    alt="orange 1"
    src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
    srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
    width={500}
    height={281}
  />
);

const AMPWebPWithJpegFallback = () => (
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
);

export const ImageA11y = () => {
  return (
    <ThemeProvider service="mundo" variant="default">
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={1}>Image A11y Testing</Heading>
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>Basic image (non-responsive)</Heading>
        <BasicImage />
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>Responsive image</Heading>
        <ResponsiveImage />
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>
          Responsive webp image with jpeg fallback (uses picture element)
        </Heading>
        <ResponsiveWebPWithJpegFallback />
      </div>
    </ThemeProvider>
  );
};

export const AmpImageA11y = () => {
  return (
    <ThemeProvider service="mundo" variant="default">
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={1}>AMP Image A11y Testing</Heading>
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>Basic image (non-responsive)</Heading>
        <BasicAMPImage />
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>Responsive image</Heading>
        <ResponsiveAMPImage />
      </div>
      <div style={{ paddingBottom: '1.5rem' }}>
        <Heading level={2}>
          Responsive webp image with jpeg fallback (uses picture element)
        </Heading>
        <AMPWebPWithJpegFallback />
      </div>
    </ThemeProvider>
  );
};

AmpImageA11y.decorators = [AmpDecorator];

export default {
  title: 'New Components/Image',
  Component: ImageA11y,
  parameters: { chromatic: { disable: true } },
};
