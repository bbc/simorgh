import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Brand from '.';
import services from '../../lib/config/services';

const stories = storiesOf('Brand', module);

Object.keys(services)
  .filter(service => service !== 'default')
  .forEach(service => {
    stories.add(service, () => (
      <ServiceContextProvider service={service}>
        <Brand />
      </ServiceContextProvider>
    ));
  });
