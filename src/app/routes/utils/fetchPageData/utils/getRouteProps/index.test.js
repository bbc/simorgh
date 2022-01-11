import reactRouterConfig from 'react-router-config';
import isAmpPath from '#app/routes/utils/isAmpPath';
import { ERROR_PAGE } from '#app/routes/utils/pageTypes';
import getRouteProps from '.';
import fallbackServiceParam from './fallbackServiceParam';

jest.mock('react-router-config');

jest.mock('./fallbackServiceParam', () =>
  jest.fn().mockImplementation(() => 'fallbackService'),
);

jest.mock('#app/routes/utils/isAmpPath', () =>
  jest.fn().mockImplementation(() => true),
);

describe('getRouteProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('valid route', () => {
    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: undefined } },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(isAmpPath).not.toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toEqual({
        isAmp: false,
        match: {
          params: {
            amp: undefined,
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
      });
    });

    it('should return service, isAmp, route and match with variants', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: { service: 'news', amp: undefined, variant: '/simp' },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(isAmpPath).not.toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toEqual({
        isAmp: false,
        match: {
          params: {
            amp: undefined,
            service: 'news',
            variant: '/simp',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
        variant: 'simp',
      });
    });
  });

  describe('valid amp route', () => {
    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: '.amp' } },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(isAmpPath).not.toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toEqual({
        isAmp: true,
        match: {
          params: {
            amp: '.amp',
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
      });
    });
  });

  describe('unknown error route', () => {
    const route = { route: 'data', pageType: ERROR_PAGE };
    // This is the match returned for a 'catch all' route.
    const match = { path: '/', url: '/', params: {}, isExact: false };

    it('should return fallback service and isAmp. With catch-all route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([{ route, match }]);

      const methodCall = await getRouteProps('unknownURL');

      expect(isAmpPath).toHaveBeenCalledWith('unknownURL');
      expect(fallbackServiceParam).toHaveBeenCalledWith('unknownURL');

      expect(methodCall).toEqual({
        isAmp: true,
        match,
        route,
        service: 'fallbackService',
      });
    });
  });

  /*
   * This behaviour should never happen, due to the catch-all error route
   * thats availible. This test however asserts that if that route isnt
   * availible, it fails gracefully.
   */
  describe('no matched route', () => {
    it('should return fallback service and amp with no route, match or Id', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([]);

      const methodCall = await getRouteProps('fakepath');

      expect(methodCall).toEqual({
        id: undefined,
        isAmp: true,
        match: undefined,
        route: undefined,
        service: 'fallbackService',
      });

      expect(isAmpPath).toHaveBeenCalled();
      expect(fallbackServiceParam).toHaveBeenCalled();
    });
  });
});
