import React from 'react';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import { ClientUni } from '@jtart/uni';
import * as reactDom from 'react-dom';
import routes from './app/routes';

jest.mock('offline-plugin/runtime', () => ({
  install: jest.fn(),
  applyUpdate: jest.fn(),
}));

jest.mock('react-dom');

jest.mock('react-router-dom');

jest.mock('@jtart/uni');

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

    describe('offline-plugin', () => {
      it('should install runtime with functions for service worker updates', async () => {
        await import('./client');

        expect(OfflinePluginRuntime.install).toHaveBeenCalledTimes(1);
        const installConfig = OfflinePluginRuntime.install.mock.calls[0][0];

        installConfig.onUpdateReady();
        expect(OfflinePluginRuntime.applyUpdate).toHaveBeenCalledTimes(1);

        installConfig.onUpdated();
        expect(window.swUpdate).toEqual(true);
      });
    });
  });

  it('should hydrate client once routes are ready', async () => {
    await import('./client');

    expect(reactDom.hydrate).toHaveBeenCalledWith(
      <ClientUni routes={routes} data={window.SIMORGH_DATA} />,
      mockRootElement,
    );
  });
});
