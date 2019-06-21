import React from 'react';
import { mount } from 'enzyme';
import ServiceWorkerContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

const contextStub = {
  swPath: '/news/articles/sw.js',
};

describe('Service Worker', () => {
  beforeEach(() => {
    global.navigator.serviceWorker = {
      register: jest.fn(),
    };
  });

  describe('on production environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      mount(
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
    });

    it('should be installed', async () => {
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
        contextStub.swPath,
      );
    });
  });

  describe('on dev environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'dev';
      mount(
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );
    });

    it('should not be installed', async () => {
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });
});
