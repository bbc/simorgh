import React, { useContext } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider, ServiceContext } from './index';

describe('ServiceContext', () => {
  const testBrandNameWithServiceContext = service => {
    const Component = () => {
      const { brandName } = useContext(ServiceContext);

      return <span>{brandName}</span>;
    };

    shouldMatchSnapshot(
      `should have a brand name for ${service}`,
      <ServiceContextProvider service={service}>
        <Component />
      </ServiceContextProvider>,
    );
  };

  testBrandNameWithServiceContext('news');
  testBrandNameWithServiceContext('persian');
  testBrandNameWithServiceContext('default');
});
