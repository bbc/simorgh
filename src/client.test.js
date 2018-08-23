import * as OfflinePluginRuntime from 'offline-plugin/runtime';

jest.mock('offline-plugin/runtime', () => ({
  install: jest.fn(),
}));

describe('Client', () => {
  describe('on production environment', () => {
    process.env.NODE_ENV = 'production';

    it('should install offline-plugin runtime', async () => {
      await import('./client');

      expect(OfflinePluginRuntime.install).toHaveBeenCalledTimes(1);
    });
  });
});
