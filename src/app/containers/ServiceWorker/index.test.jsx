import React from 'react';
import { mount } from 'enzyme';
import ServiceWorkerContainer from './index';

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

describe('Service Worker', () => {
  beforeEach(() => {
    global.navigator.serviceWorker = {
      register: jest.fn(),
    };
  });

  describe('on production environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      mount(<ServiceWorkerContainer />);
    });

    it('should be installed', async () => {
      expect(navigator.serviceWorker.register).toHaveBeenCalled();
    });
  });

  describe('on dev environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'dev';
      mount(<ServiceWorkerContainer />);
    });

    it('should not be installed', async () => {
      expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    });
  });
});
