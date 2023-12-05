import React from 'react';
import { render } from '../react-testing-library-with-providers';
import { ServiceContext } from '../../contexts/ServiceContext';
import ServiceWorkerContainer from './index';
import onClient from '../../lib/utilities/onClient';

const contextStub = {
  swPath: '/articles/sw.js',
  service: 'news',
};

const mockServiceWorker = {
  register: jest.fn(),
};

jest.mock('../../lib/utilities/onClient', () =>
  jest.fn().mockImplementation(() => true),
);

describe('Service Worker', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    jest.resetAllMocks();

    global.navigator = originalNavigator;
  });

  describe('on canonical', () => {
    it('is registered when swPath, serviceWorker have values and onClient is true', () => {
      // @ts-expect-error need to override the navigator.serviceWorker for testing purposes
      global.navigator.serviceWorker = mockServiceWorker;
      (onClient as jest.Mock).mockImplementationOnce(() => true);

      render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={{ ...contextStub }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
        `/news/articles/sw.js`,
      );
    });

    describe('is not registered', () => {
      it.each`
        swPath                | serviceWorker        | isOnClient
        ${undefined}          | ${undefined}         | ${true}
        ${undefined}          | ${undefined}         | ${false}
        ${undefined}          | ${mockServiceWorker} | ${true}
        ${undefined}          | ${mockServiceWorker} | ${false}
        ${contextStub.swPath} | ${mockServiceWorker} | ${false}
      `(
        'when swPath is $swPath, serviceWorker is $serviceWorker and isOnClient is $isOnClient',
        ({ swPath, serviceWorker, isOnClient }) => {
          if (serviceWorker) {
            // @ts-expect-error need to override the navigator.serviceWorker for testing purposes
            global.navigator.serviceWorker = serviceWorker;
          }

          (onClient as jest.Mock).mockImplementationOnce(() => isOnClient);

          render(
            // @ts-expect-error only require a subset of properties on service context for testing purposes
            <ServiceContext.Provider value={{ ...contextStub, swPath }}>
              <ServiceWorkerContainer />
            </ServiceContext.Provider>,
          );
          expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('on amp', () => {
    const isAmp = true;

    it('is enabled when swPath has a value', () => {
      const { container } = render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp },
      );

      expect(
        container.querySelector('amp-install-serviceworker'),
      ).toBeInTheDocument();
    });

    it('is disabled when swPath does not have a value', () => {
      const { container } = render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={{ ...contextStub, swPath: '' }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp },
      );

      expect(
        container.querySelector('amp-install-serviceworker'),
      ).not.toBeInTheDocument();
    });
  });
});
