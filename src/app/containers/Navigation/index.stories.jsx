import React from 'react';
import { storiesOf } from '@storybook/react';
import NavigationContainer from '.';
import services from '#server/utilities/serviceConfigs';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const stories = storiesOf('Containers|Navigation', module).addParameters({
  chromatic: { disable: true },
});

Object.keys(services).forEach(service => {
  Object.keys(services[service])
    .filter(variant => services[service][variant].navigation)
    .forEach(variant => {
      stories.add(`${service} - ${variant}`, () => (
        <ServiceContextProvider service={service} variant={variant}>
          <NavigationContainer />
        </ServiceContextProvider>
      ));
    });
});
