import React from 'react';
import { renderRadioSchedule as Component } from './testHelpers/helper';

export default {
  title: 'Components/Radio Schedule',
  Component,
};

export const RadioSchedule = () => <Component />;

export const ScheduleDifferentHeights = () => <Component withLongSummary />;
