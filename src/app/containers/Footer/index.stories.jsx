import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '#testHelpers/serviceConfigs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Footer from '.';

storiesOf('Containers|Footer', module)
  .addParameters({ chromatic: { disable: false } })
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => {
        return (
          <ServiceContextProvider service={service}>
            <Footer />
          </ServiceContextProvider>
        );
      },
      services: Object.keys(services),
    }),
  );
