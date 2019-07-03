import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from '.';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import { select, withKnobs } from '@storybook/addon-knobs';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('default', () => {
    const serviceChoice = select('Select a service', services, 'news');

    return (
      <ServiceContextProvider service={serviceChoice}>
        <Footer />
      </ServiceContextProvider>
    );
  });
