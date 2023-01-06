import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import FooterComponent from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <ServiceContextProvider service={service}>
    <FooterComponent />
  </ServiceContextProvider>
);

export default {
  title: 'Containers/Footer',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: { disable: true },
  },
};

export const Footer = props => <Component {...props} />;
