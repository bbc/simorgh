import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Grid from './grid';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Grid />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Curations/Hierarchy',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
