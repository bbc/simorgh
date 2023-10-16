import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { renderRadioSchedule as Component } from './testHelpers/helper';
import ThemeProvider from '../../../components/ThemeProvider';
​
export default {
  title: 'Components/Radio Schedule',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};
​
export const RadioSchedule =  props => (
  <ThemeProvider service="news">
    <Component {...props} />
  </ThemeProvider>
);
​
export const ScheduleDifferentHeights = props => (
  <ThemeProvider service="news">
    <Component {...props} withLongSummary />
  </ThemeProvider>
);