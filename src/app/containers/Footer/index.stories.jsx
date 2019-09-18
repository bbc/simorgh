import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '#lib/config/services';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Footer from '.';

storiesOf('Containers|Footer', module)
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
