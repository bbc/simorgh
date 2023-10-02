import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ServiceWorkerContainer from './index';

const contextStub = {
  swPath: '/articles/sw.js',
  service: 'news',
};

const mockServiceWorker = {
  register: jest.fn(),
};

describe('Service Worker', () => {
  let wrapper;

  beforeEach(() => {
    global.navigator.serviceWorker = mockServiceWorker;
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (wrapper) {
      wrapper.unmount();
    }
    delete process.env.SIMORGH_APP_ENV;
  });

  describe('is enabled', () => {
    it.each`
      swPath               | serviceWorker        | environment | isAmp    | scenario
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'local'}  | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is local and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'test'}   | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is test and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'live'}   | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is live and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'test'}   | ${true}  | ${'because swPath has a value, serviceWorker is enabled, environment is test and isAmp is true'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'live'}   | ${true}  | ${'because swPath has a value, serviceWorker is enabled, environment is live and isAmp is true'}
    `('$scenario', ({ swPath, serviceWorker, environment, isAmp }) => {
      process.env.SIMORGH_APP_ENV = environment;
      global.navigator.serviceWorker = serviceWorker;

      wrapper = render(
        <ServiceContext.Provider value={{ ...contextStub, swPath }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp },
      );
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
        `/news/articles/sw.js`,
      );
    });
  });

  describe('is disabled', () => {
    it.each`
      swPath               | serviceWorker        | environment | isAmp    | scenario
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'local'}  | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is local and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'test'}   | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is test and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'live'}   | ${false} | ${'because swPath has a value, serviceWorker is enabled, environment is live and isAmp is false'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'test'}   | ${true}  | ${'because swPath has a value, serviceWorker is enabled, environment is test and isAmp is true'}
      ${'/articles/sw.js'} | ${mockServiceWorker} | ${'live'}   | ${true}  | ${'because swPath has a value, serviceWorker is enabled, environment is live and isAmp is true'}
    `('$scenario', ({ swPath, serviceWorker, environment, isAmp }) => {
      process.env.SIMORGH_APP_ENV = environment;
      global.navigator.serviceWorker = serviceWorker;

      wrapper = render(
        <ServiceContext.Provider value={{ ...contextStub, swPath }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp },
      );
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });

  describe('when swPath is not set (to disable the service worker)', () => {
    it('should not be installed', async () => {
      process.env.NODE_ENV = 'production';
      const localContextStub = contextStub;

      delete localContextStub.swPath;

      render(
        <ServiceContext.Provider value={localContextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });
});
