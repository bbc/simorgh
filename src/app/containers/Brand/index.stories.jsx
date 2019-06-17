import React from 'react';
import { storiesOf } from '@storybook/react';
import * as svgs from '@bbc/psammead-assets/svgs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Brand from '.';
import services from '../../lib/config/services';

const stories = storiesOf('Brand', module);

Object.keys(services)
  .filter(service => service !== 'default')
  .forEach(service => {
    stories.add(service, () => (
      <ServiceContextProvider service={service}>
        <Brand
          product="BBC News"
          svg={svgs[service]}
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
        />
      </ServiceContextProvider>
    ));
  });
