import React from 'react';
import { ClientApp } from 'react-universal-app';
import * as reactDom from 'react-dom';
import routes from './app/routes';

jest.mock('react-dom');

jest.mock('react-router-dom');

jest.mock('react-universal-app');

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

  describe('on production environment', () => {
    process.env.NODE_ENV = 'production';

    it('should install service worker updates', async () => {
      Object.defineProperty(global.navigator, 'serviceWorker', {
        value: {
          register: jest.fn(),
        },
      });

      window.SIMORGH_DATA = {
        service: 'foobar',
      };

      await import('./client');

      expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/foobar/articles/sw.js');
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
