import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { renderProgramCard as Component } from '../testHelpers/helper';
import ThemeProvider from '../../../../components/ThemeProvider';

export default {
  title: 'Components/Radio Schedule/Program Card',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const OnDemand = props => (
  <ThemeProvider service="news">
    <Component {...props} state="onDemand" />
  </ThemeProvider>
);
export const Live = props => (
  <ThemeProvider service="news">
    <Component {...props} state="live" />
  </ThemeProvider>
);
export const Next = props => (
  <ThemeProvider service="news">
    <Component {...props} state="next" />
  </ThemeProvider>
);
