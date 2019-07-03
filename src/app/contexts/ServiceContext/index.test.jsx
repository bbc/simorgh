import React, { useContext } from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import services from '../../lib/config/services/loadableConfig';
import * as createLoadableContext from '../utils/createLoadableContext';

// Unmock service context which is mocked globally in jest-setup.js
jest.unmock('./index');
jest.mock('../utils/createLoadableContext', () => jest.fn());

describe('ServiceContextProvider', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  it('should create loadable contexts on import', () => {
    expect(createLoadableContext).not.toHaveBeenCalled();

    require('./index'); // eslint-disable-line global-require

    expect(createLoadableContext).toHaveBeenCalledTimes(
      Object.keys(services).length,
    );
  });

  describe('should load hydrated service context', () => {
    beforeEach(() => {
      jest.unmock('../utils/createLoadableContext');
    });

    Object.keys(services).forEach(service =>
      it(`should have a brand name for ${service}`, async () => {
        // eslint-disable-next-line global-require
        const { ServiceContext, ServiceContextProvider } = require('./index');

        const Component = () => {
          const { brandName } = useContext(ServiceContext);

          return <span>{brandName}</span>;
        };

        const { container } = render(
          <ServiceContextProvider service={service}>
            <Component />
          </ServiceContextProvider>,
        );

        await waitForElement(() => container.querySelector('span'));

        expect(container.innerHTML).toMatchSnapshot();
      }),
    );

    it(`should return null for foobar service`, async () => {
      // eslint-disable-next-line global-require
      const { ServiceContext, ServiceContextProvider } = require('./index');

      const Component = () => {
        const { brandName } = useContext(ServiceContext);

        return <span>{brandName}</span>;
      };

      const { container } = render(
        <ServiceContextProvider service="foobar">
          <Component />
        </ServiceContextProvider>,
      );

      expect(container.querySelector('span')).toBeNull();
    });
  });
});
