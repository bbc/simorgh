import React from 'react';
import { storiesOf } from '@storybook/react';
import NavigationContainer from '.';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const stories = storiesOf('Navigation', module);

Object.keys(services)
  .filter(service => ['default', 'news', 'persian'].indexOf(service) === -1)
  .forEach(service => {
    stories.add(service, () => (
      <ServiceContextProvider service={service}>
        <NavigationContainer />
      </ServiceContextProvider>
    ));
  });
