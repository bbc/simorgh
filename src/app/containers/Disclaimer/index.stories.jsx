import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import DisclaimerComponent from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
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

export default {
  title: 'Containers/Disclaimer',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'russian' })],
  parameters: { chromatic: { disable: true } },
};

export const Disclaimer = props => <Component {...props} />;
