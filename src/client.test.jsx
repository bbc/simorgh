import React from 'react';
import * as reactDom from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import { resetInactivityTimer } from './invalidationStrategy';

jest.mock('react-dom');

jest.mock('react-router-dom');

jest.mock('./app/containers/App');

jest.mock('./app/routes', () => ({
  default: [],
}));

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

describe('Client', () => {
  beforeAll(() => {
    window.SIMORGH_DATA = 'someData';
  });

  afterAll(() => {
    window.SIMORGH_DATA = null;
  });

  describe('service worker', () => {
    beforeEach(() => {
      global.navigator.serviceWorker = {
        register: jest.fn(),
      };

      window.SIMORGH_DATA = {
        service: 'foobar',
      };
    });

    describe('on production environment', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      it('should be installed', async () => {
        await import('./client');

        expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
          '/foobar/articles/sw.js',
        );
      });
    });

    describe('on dev environment', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'dev';
      });

      it('should not be installed', async () => {
        await import('./client');

        expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
      });
    });
  });

  it('should hydrate client once routes are ready', async () => {
    await import('./client');

    expect(reactDom.hydrate).toHaveBeenCalledWith(
      <ClientApp
        routes={routes}
        data={window.SIMORGH_DATA}
        onNewRoute={resetInactivityTimer}
      />,
      mockRootElement,
    );
  });
});
