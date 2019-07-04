import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Footer from '.';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add(
    'testing',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ServiceContextProvider service={service}>
            <Footer />
          </ServiceContextProvider>
        );
      },
      Object.keys(services),
    ),
  );
