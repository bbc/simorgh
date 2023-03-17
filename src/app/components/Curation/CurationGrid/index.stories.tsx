import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../ThemeProvider';
import CurationGrid from '.';
import { StorybookProps } from '../types';

const Component = ({ service, variant }: StorybookProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <CurationGrid promos={fixture.data.curations[0].summaries} />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Curation/Grid - Normal',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
