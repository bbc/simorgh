import React from 'react';
import onClient from '#app/lib/utilities/onClient';
import isLocal from '#app/lib/utilities/isLocal';
import { render } from '../react-testing-library-with-providers';
import { ServiceContext } from '#contexts/ServiceContext';
import ServiceWorkerContainer from './index';

const contextStub = {
  swPath: '/articles/sw.js',
  service: 'news',
};

const mockServiceWorker = {
  register: jest.fn(),
};

jest.mock('#app/lib/utilities/onClient', () =>
  jest.fn().mockImplementation(() => true),
);

jest.mock('#app/lib/utilities/isLocal', () =>
  jest.fn().mockImplementation(() => true),
);

describe('Service Worker', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    jest.resetAllMocks();

    global.navigator ??= originalNavigator;
  });

  describe('Canonical', () => {
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

  describe('Amp', () => {
    it('is enabled when swPath has a value and not on local environment', () => {
      (isLocal as jest.Mock).mockImplementationOnce(() => false);

      const { container } = render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={{ ...contextStub }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp: true },
      );

      expect(
        container.querySelector('amp-install-serviceworker'),
      ).toBeInTheDocument();
    });

    describe('is disabled', () => {
      it.each`
        swPath       | isLocalEnv | reason
        ${undefined} | ${false}   | ${'swPath is undefined'}
        ${undefined} | ${false}   | ${'swPath is null'}
        ${''}        | ${false}   | ${'swPath is empty'}
        ${'swPath'}  | ${true}    | ${'service worker not supported on local environment on amp as it requires https'}
      `(
        'when swPath is $swPath and isLocalEnv is $isLocalEnv because $reason',
        ({ swPath, isLocalEnv }) => {
          (isLocal as jest.Mock).mockImplementationOnce(() => isLocalEnv);

          const { container } = render(
            // @ts-expect-error only require a subset of properties on service context for testing purposes
            <ServiceContext.Provider value={{ ...contextStub, swPath }}>
              <ServiceWorkerContainer />
            </ServiceContext.Provider>,
            { isAmp: true },
          );

          expect(
            container.querySelector('amp-install-serviceworker'),
          ).not.toBeInTheDocument();
        },
      );
    });
  });
});
