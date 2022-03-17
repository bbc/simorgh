import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#legacy/psammead-storybook-helpers';
import { renderRadioSchedule as Component } from './testHelpers/helper';

export default {
  title: 'Components/Radio Schedule',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const RadioSchedule = Component;

export const ScheduleDifferentHeights = props => (
  <Component {...props} withLongSummary />
);
