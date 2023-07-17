import React from 'react';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import ThemeProvider from '../ThemeProvider';
import { StoryProps } from '../../models/types/storybook';

import metadata from './metadata.json';
import DisclaimerComponent from '.';
import md from './README.md';

const Component = ({ service, variant }: StoryProps) => {
  return (
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled: true,
        },
      }}
    >
      <ServiceContextProvider service={service}>
        <ThemeProvider service={service} variant={variant}>
          <DisclaimerComponent />
        </ThemeProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'New Components/Disclaimer',
  Component,
  parameters: {
    metadata,
    docs: {
      component: {
        title: 'Disclaimer',
      },
      page: md,
    },
  },
};

export const Disclaimer = ({ variant }: StoryProps) => (
  <Component service="russian" variant={variant} />
);
