import React, { useContext } from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import { ServiceContextProvider, ServiceContext } from './index';

const renderWithContextProvider = (node, service) => (
  <ServiceContextProvider service={service}>{node}</ServiceContextProvider>
);

const Component = () => {
  const { brandName } = useContext(ServiceContext);

  return <span>{brandName}</span>;
};

describe('ServiceContext', () => {
  const testBrandNameWithServiceContext = service => {
    shouldMatchSnapshot(
      `should have a brand name for ${service}`,
      renderWithContextProvider(<Component />, service),
    );
  };

  testBrandNameWithServiceContext('news');
  testBrandNameWithServiceContext('persian');
  testBrandNameWithServiceContext('default');
});
