import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import FooterComponent from '.';
import ThemeProvider from '../../../components/ThemeProvider';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <FooterComponent />
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  title: 'Containers/Footer/Footer',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: { disable: true },
  },
};

export const Footer = props => <Component {...props} />;
