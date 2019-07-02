import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from '.';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';

Object.keys(services)
  .filter(service => service !== 'default')
  .forEach(service => {
    storiesOf('Footer', module)
      .addDecorator(withKnobs)
      .addDecorator(dirDecorator)
      .add(service, () => (
        <ServiceContextProvider service={service}>
          <Footer />
        </ServiceContextProvider>
      ));
  });
