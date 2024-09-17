import React from 'react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { StoryProps } from '#models/types/storybook';

import metadata from './metadata.json';
import DisclaimerComponent from '.';
import readme from './README.md';

const Component = ({ service }: StoryProps) => {
  return (
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled: true,
        },
      }}
    >
      <ServiceContextProvider service={service}>
        <DisclaimerComponent />
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Components/Disclaimer',
  Component,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Disclaimer = ({ variant }: StoryProps) => (
  <Component service="russian" variant={variant} />
);
