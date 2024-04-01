import React from 'react';
import { renderRadioSchedule as Component } from './testHelpers/helper';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

export default {
  title: 'Components/Radio Schedule',
  Component,
  decorators: [withServicesDecorator],
};

export const RadioSchedule = (_, globalArgs) => {
  console.log(globalArgs);
  return <Component {...globalArgs} />;
};

export const ScheduleDifferentHeights = (_, globalArgs) => (
  <Component {...globalArgs} withLongSummary />
);
