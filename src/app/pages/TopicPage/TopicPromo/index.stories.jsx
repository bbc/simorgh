import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import TopicPromo from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <TopicPromo />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Promo',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
