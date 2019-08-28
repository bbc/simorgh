import React from 'react';
import { storiesOf } from '@storybook/react';
import services from '@lib/config/services';
import { ServiceContextProvider } from '@contexts/ServiceContext';
import NavigationContainer from '.';

const stories = storiesOf('Containers|Navigation', module);

Object.keys(services)
  .filter(service => services[service].navigation)
  .forEach(service => {
    stories.add(service, () => (
      <ServiceContextProvider service={service}>
        <NavigationContainer />
      </ServiceContextProvider>
    ));
  });
