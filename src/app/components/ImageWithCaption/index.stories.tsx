import React from 'react';
import ImageContainer from '.';
import { custom, imageData, landscape, portrait, square } from './fixtureData';
import ThemeProvider from '../ThemeProvider';

type Props = {
  blocks: object[];
  position?: number[];
  sizes?: string;
  shouldPreload?: boolean;
};

const Component = (props: Props) => (
  <ThemeProvider service="news">
    <ImageContainer {...props} />
  </ThemeProvider>
);

export default {
  title: 'Components/Image with caption',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const LandscapeImage = () => (
  <Component {...imageData({ image: landscape })} />
);
export const PortraitImage = () => (
  <Component {...imageData({ image: portrait })} />
);
export const SquareImage = () => (
  <Component {...imageData({ image: square })} />
);
export const CustomRatioImage = () => (
  <Component {...imageData({ image: custom })} />
);
export const CaptionedImage = () => (
  <Component
    {...imageData({ image: landscape, caption: 'Some caption text...' })}
  />
);
