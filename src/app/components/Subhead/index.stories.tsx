import React from 'react';

import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import Subheading from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Subheading>These are the children</Subheading>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Curations/Subheading',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
