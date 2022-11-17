import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ServiceWorkerContainer from './index';

const contextStub = {
  swPath: '/articles/sw.js',
  service: 'news',
};

describe('Service Worker', () => {
  let wrapper;
  beforeEach(() => {
    global.navigator.serviceWorker = {
      register: jest.fn(),
    };
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('on production environment', () => {
    it('should be installed', async () => {
      process.env.NODE_ENV = 'production';
      wrapper = render(
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
        `/news/articles/sw.js`,
      );
    });
  });

  describe('on dev environment', () => {
    it('should not be installed', async () => {
      process.env.NODE_ENV = 'dev';
      wrapper = render(
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });

  describe('when swPath is not set (to disable the service worker)', () => {
    it('should not be installed', async () => {
      process.env.NODE_ENV = 'production';
      const localContextStub = contextStub;

      delete localContextStub.swPath;

      wrapper = render(
        <ServiceContext.Provider value={localContextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });
});
