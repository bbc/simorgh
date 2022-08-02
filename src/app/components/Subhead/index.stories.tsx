import React from 'react';

import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import Subheading from '.';



// @ts-ignore
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
        <Subheading children="These are the children"/>
    </ServiceContextProvider>
  );
};


export default {
  title: 'Topic/Curations/Subheading - Normal',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;

