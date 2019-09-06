import React, { useContext } from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import services from '../../lib/config/services';
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

    const testForServiceAndVarient = (service, variant) => {
      it(`should have a brand name for ${service} and variant ${variant}`, async () => {
        // eslint-disable-next-line global-require
        const { ServiceContext, ServiceContextProvider } = require('./index');

        const Component = () => {
          const { brandName } = useContext(ServiceContext);

          return <span>{brandName}</span>;
        };

        const serviceContextProps = {
          service,
          // Dont pass variant if its 'default', this better mirrors the
          // behaviour in the production app, where varient is unset for
          // services with only a 'default' variant
          variant: variant === 'default' ? null : variant,
        };

        const { container } = render(
          <ServiceContextProvider {...serviceContextProps}>
            <Component />
          </ServiceContextProvider>,
        );

        await waitForElement(() => container.querySelector('span'));

        expect(container.firstChild.innerHTML).toEqual(
          services[service][variant].brandName,
        );
      });
    };

    Object.keys(services).forEach(service => {
      Object.keys(services[service]).forEach(variant =>
        testForServiceAndVarient(service, variant),
      );
    });

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
