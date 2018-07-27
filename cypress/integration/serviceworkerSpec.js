import makeServiceWorkerEnv from 'service-worker-mock';
import makeFetchMock from 'service-worker-mock/fetch';
import sw from '../../build/public/service-worker';

describe('Service worker', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv(), makeFetchMock());
    jest.resetModules();
    cy.visit('/article/article-id');
  });

  it('should add listeners', () => {
    expect(sw.listeners.install).toBeDefined();
  });

  it('should delete old caches on activate', async () => {
    await sw.trigger('install');
  });
});
