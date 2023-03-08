import React from 'react';
import { GridWrapper } from '#components/Grid';
import ImageContainer from '.';
import {
  custom,
  imageData,
  landscape,
  portrait,
  square,
} from './helpers/fixtureData';
import ThemeProvider from '../../../components/ThemeProvider';

const Component = props => (
  <ThemeProvider service="news">
    <GridWrapper>
      <ImageContainer {...props} />
    </GridWrapper>
  </ThemeProvider>
);

export default {
  title: 'Containers/Image within grid',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const LandscapeImage = () => <Component {...imageData(landscape)} />;
export const PortraitImage = () => <Component {...imageData(portrait)} />;
export const SquareImage = () => <Component {...imageData(square)} />;
export const CustomRatioImage = () => <Component {...imageData(custom)} />;
