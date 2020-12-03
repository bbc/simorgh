import React from 'react';
import { render } from '@testing-library/react';
import ServiceWorkerContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';

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
});
