import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import ThemeProvider from '../../../../components/ThemeProvider';
import CurationGrid from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <CurationGrid promos={fixture.data.summaries} />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/Curations/Grid - Normal',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
