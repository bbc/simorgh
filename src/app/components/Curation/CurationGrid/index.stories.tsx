import React from 'react';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../ThemeProvider';
import CurationGrid from '.';
import { StoryProps } from '../../../models/types/storybook';

const Component = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <CurationGrid summaries={fixture.data.curations[0].summaries} />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Curation/Grid - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
