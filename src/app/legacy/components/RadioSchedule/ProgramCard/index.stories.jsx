import React from 'react';
import { renderProgramCard as Component } from '../testHelpers/helper';

export default {
  title: 'Components/Radio Schedule/Program Card',
  Component,
};

export const OnDemand = () => <Component state="onDemand" />;
export const Live = () => <Component state="live" />;
export const Next = () => <Component state="next" />;
