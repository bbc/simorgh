import React from 'react';
import * as ServiceContextComponent from '../../contexts/ServiceContext';
import { syncServices } from '../../lib/config/services';

jest.mock('../../contexts/ServiceContext');
ServiceContextComponent.ServiceContextProvider = jest.fn();
ServiceContextComponent.ServiceContextProvider.mockImplementation(
  ({ service, children }) => {
    const { ServiceContext } = ServiceContextComponent;

    return (
      <ServiceContext.Provider value={syncServices[service || 'default']}>
        {children}
      </ServiceContext.Provider>
    );
  },
);
