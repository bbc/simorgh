import React from 'react';
import { storiesOf } from '@storybook/react';
import NavigationContainer from '.';
import services from '#lib/config/services';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const stories = storiesOf('Containers|Navigation', module).addParameters({
  chromatic: { disable: false },
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
