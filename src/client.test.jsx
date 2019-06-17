import React from 'react';
import * as reactDom from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import getRouteProps from './app/routes/getInitialData/utils/getRouteProps';
import { setWindowValue, resetWindowValue } from './testHelpers';

jest.mock('react-dom');

jest.mock('react-router-dom');

jest.mock('./app/containers/App');

jest.mock('./app/routes', () => ({
  default: [],
}));

jest.mock('./app/routes/getInitialData/utils/getRouteProps');

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

const windowLocation = window.location;
const pathname = '/foobar/articles/c0000000001o';

describe('Client', () => {
  beforeAll(() => {
    setWindowValue('SIMORGH_DATA', 'someData');
    setWindowValue('location', { pathname });
  });

  afterAll(() => {
    resetWindowValue('SIMORGH_DATA', null);
    resetWindowValue('location', windowLocation);
  });

  describe('service worker', () => {
    beforeEach(() => {
      global.navigator.serviceWorker = {
        register: jest.fn(),
      };

      getRouteProps.mockReturnValue({ service: 'foobar' });
    });

    describe('on production environment', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      it('should be installed', async () => {
        await import('./client');

        expect(getRouteProps).toHaveBeenCalledWith(routes, pathname);
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
      <ClientApp routes={routes} data={window.SIMORGH_DATA} />,
      mockRootElement,
    );
  });
});
