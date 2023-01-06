import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import IndexHeadingContainer from '.';

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
