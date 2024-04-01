import React from 'react';
import { renderProgramCard as Component } from '../testHelpers/helper';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

export default {
  title: 'Components/Radio Schedule/Program Card',
  Component,
  decorators: [withServicesDecorator],
};

export const OnDemand = (_, globalArgs) => (
  <Component {...globalArgs} state="onDemand" />
);
export const Live = (_, globalArgs) => (
  <Component {...globalArgs} state="live" />
);
export const Next = (_, globalArgs) => (
  <Component {...globalArgs} state="next" />
);
