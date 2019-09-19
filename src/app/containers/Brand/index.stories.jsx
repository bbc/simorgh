import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '#lib/config/services';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import BrandContainer from '.';

storiesOf('Containers|Brand', module)
  .addParameters({ chromatic: { disable: false } })
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const serviceConfig = require(`../../lib/config/services/${service}`)
          .default;
        const configVariant = serviceConfig.default;

        return (
          <ServiceContextProvider service={service}>
            <BrandContainer
              backgroundColour={configVariant.theming.brandBackgroundColour}
              logoColour={configVariant.theming.brandLogoColour}
            />
          </ServiceContextProvider>
        );
      },
      services: Object.keys(services),
    }),
  );
