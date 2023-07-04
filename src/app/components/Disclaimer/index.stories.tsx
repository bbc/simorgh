import React from 'react';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import ThemeProvider from '../ThemeProvider';
import { StoryProps } from '../../models/types/storybook';

import metadata from './metadata.json';
import DisclaimerComponent from '.';

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
  title: 'Components/Disclaimer',
  Component,
  parameters: {
    metadata,
    chromatic: { disable: true },
  },
};

export const Disclaimer = ({ variant }: StoryProps) => (
  <Component service="russian" variant={variant} />
);
