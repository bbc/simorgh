import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import BrandContainer from '.';

storiesOf('Containers|Brand', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const serviceConfig = require(`../../lib/config/services/${service}`);

        return (
          <ServiceContextProvider service={service}>
            <BrandContainer
              backgroundColour={serviceConfig.default.brandBackgroundColour}
              logoColour={serviceConfig.default.brandLogoColour}
            />
          </ServiceContextProvider>
        );
      },
      services: Object.keys(services),
    }),
  );
