import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import Gist from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import blocks from './fixtures';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider isAmp={false} service={service}>
        <Gist blocks={blocks} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Containers/Gist',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const AtAGlance = Component;
