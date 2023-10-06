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

export const LandscapeImage = () => <Component {...imageData(landscape)} />;
export const PortraitImage = () => <Component {...imageData(portrait)} />;
export const SquareImage = () => <Component {...imageData(square)} />;
export const CustomRatioImage = () => <Component {...imageData(custom)} />;
