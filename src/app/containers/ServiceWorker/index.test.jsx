import React from 'react';
import { mount } from 'enzyme';
import ServiceWorkerContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

const contextStub = {
  swPath: '/articles/sw.js',
  service: 'news',
};

describe('Service Worker', () => {
  beforeEach(() => {
    global.navigator.serviceWorker = {
      register: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on production environment', () => {
    it('should be installed', async () => {
      process.env.NODE_ENV = 'production';
      mount(
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
      mount(
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });
});
