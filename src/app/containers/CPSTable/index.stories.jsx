import React from 'react';
import { storiesOf } from '@storybook/react';
import { latin } from '@bbc/gel-foundations/scripts';

import { ServiceContext } from '#contexts/ServiceContext';

import CPSTable from '.';
import fixtures from './fixtures';

fixtures.forEach((fixture, index) => {
  storiesOf('Containers/CPS Table', module).add(`Example ${index + 1}`, () => {
    return (
      <ServiceContext.Provider
        value={{ script: latin, service: 'sport', dir: 'ltr' }}
      >
        <CPSTable supportedServices={['sport']} blocks={[fixture]} />
      </ServiceContext.Provider>
    );
  });
});
