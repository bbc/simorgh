import React, { useContext } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider, ServiceContext } from './index';
import services from '../../lib/config/services/async';

let createLoadableContext;

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

  Object.keys(services).forEach(service =>
    testBrandNameWithServiceContext(service),
  );
});
