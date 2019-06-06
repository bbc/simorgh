import React from 'react';
import * as ServiceContextComponent from '../../contexts/ServiceContext';
import services from '../../lib/config/services/sync';

jest.mock('../../contexts/ServiceContext');
ServiceContextComponent.ServiceContextProvider = jest.fn();
ServiceContextComponent.ServiceContextProvider.mockImplementation(
  ({ service, children }) => {
    const { ServiceContext } = ServiceContextComponent;

    return (
      <ServiceContext.Provider value={services[service || 'default']}>
        {children}
      </ServiceContext.Provider>
    );
  },
);
