import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import IndexHeadingContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <ServiceContextProvider service={service}>
    <IndexHeadingContainer>Index Heading</IndexHeadingContainer>
  </ServiceContextProvider>
);

export default {
  title: 'Containers/Index Heading',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const IndexHeading = Component;
