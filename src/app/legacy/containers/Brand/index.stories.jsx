import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import BrandContainer from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const serviceConfig =
    require(`../../../lib/config/services/${service}`).service;

  const configVariant = serviceConfig[variant];
  return (
    <ServiceContextProvider service={service}>
      <BrandContainer
        backgroundColour={configVariant.theming.brandBackgroundColour}
        logoColour={configVariant.theming.brandLogoColour}
      />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Containers/Brand/Brand',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Brand = props => <Component {...props} />;
