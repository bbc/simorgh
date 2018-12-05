import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider, ServiceContextConsumer } from './index';

describe('ServiceContext', () => {
  const testBrandNameWithServiceContext = service => {
    shouldMatchSnapshot(
      `should have a brand name for ${service}`,
      <ServiceContextProvider service={service}>
        <ServiceContextConsumer>
          {props => <span>{props.brandName}</span>}
        </ServiceContextConsumer>
      </ServiceContextProvider>,
    );
  };

  testBrandNameWithServiceContext('news');
  testBrandNameWithServiceContext('persian');
  testBrandNameWithServiceContext('default');
});
