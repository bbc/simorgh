import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import BrandContainer from '.';

storiesOf('Containers|Brand', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service, variant }) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const serviceConfig = require(`../../lib/config/services/${service}`)
      .service;

    const configVariant = serviceConfig[variant];

    return (
      <ServiceContextProvider service={service}>
        <BrandContainer
          backgroundColour={configVariant.theming.brandBackgroundColour}
          logoColour={configVariant.theming.brandLogoColour}
        />
      </ServiceContextProvider>
    );
  });
