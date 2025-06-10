import React from 'react';
import SuccessScreen from '.';

const Component = () => (
  <SuccessScreen
    title="Form title"
    replyEmailAddress="test@bbc.co.uk"
    retentionPeriod="270"
  />
);

export default {
  title: 'Components/FormScreens/SuccessScreen',
  component: Component,
};

export const Example = Component;
