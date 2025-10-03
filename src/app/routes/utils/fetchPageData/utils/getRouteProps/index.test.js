import reactRouterConfig from 'react-router-config';
import getPathExtension from '#app/utilities/getPathExtension';
import { ERROR_PAGE } from '#app/routes/utils/pageTypes';
import getRouteProps from '.';
import fallbackServiceParam from './fallbackServiceParam';

jest.mock('react-router-config');

jest.mock('./fallbackServiceParam', () =>
  jest.fn().mockImplementation(() => 'fallbackService'),
);

jest.mock('#app/utilities/getPathExtension', () =>
  jest.fn().mockImplementation(() => ({
    isAmp: true,
    isApp: true,
    isLite: true,
  })),
);

describe('getRouteProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('valid route', () => {
    it('should return service, isAmp, isApp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: {
              service: 'news',
              amp: undefined,
              nonCanonicalArticleRenderPlatform: undefined,
            },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(getPathExtension).toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true, // Resolves to true because of the getPathExtension mock (ln14)
        isApp: true, // Resolves to true because of the getPathExtension mock (ln18)
        isLite: true,
        match: {
          params: {
            amp: undefined,
            nonCanonicalArticleRenderPlatform: undefined,
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
        variant: undefined,
      });
    });

    it('should return service, isAmp, isApp, route and match with variants', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: {
              service: 'news',
              amp: undefined,
              nonCanonicalArticleRenderPlatform: undefined,
              variant: '/simp',
            },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(getPathExtension).toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true, // Resolves to true because of the getPathExtension mock (ln14)
        isApp: true, // Resolves to true because of the getPathExtension mock (ln18)
        isLite: true,
        match: {
          params: {
            amp: undefined,
            nonCanonicalArticleRenderPlatform: undefined,
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
    it('should return service, isAmp, isApp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: {
              service: 'news',
              amp: '.amp',
              nonCanonicalArticleRenderPlatform: undefined,
            },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(getPathExtension).toHaveBeenCalled();
      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true,
        isApp: true, // Resolves to true because of the getPathExtension mock (ln18)
        isLite: true,
        match: {
          params: {
            amp: '.amp',
            nonCanonicalArticleRenderPlatform: undefined,
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
        variant: undefined,
      });
    });

    it('should return service, isAmp, isApp, route and match for an amp Optimo articles', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: {
              service: 'news',
              amp: undefined,
              nonCanonicalArticleRenderPlatform: '.amp',
            },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(getPathExtension).toHaveBeenCalled();

      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true,
        isApp: true, // Resolves to true because of the getPathExtension mock (ln18)
        isLite: true,
        match: {
          params: {
            amp: undefined,
            nonCanonicalArticleRenderPlatform: '.amp',
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
        variant: undefined,
      });
    });
  });

  describe('valid app route', () => {
    it('should return service, isAmp, isApp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: {
            params: {
              service: 'news',
              amp: undefined,
              nonCanonicalArticleRenderPlatform: '.app',
            },
          },
        },
      ]);

      const methodCall = await getRouteProps('url');

      expect(getPathExtension).toHaveBeenCalled();

      expect(fallbackServiceParam).not.toHaveBeenCalled();

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true, // Resolves to true because of the getPathExtension mock (ln14)
        isApp: true,
        isLite: true,
        match: {
          params: {
            amp: undefined,
            nonCanonicalArticleRenderPlatform: '.app',
            service: 'news',
          },
        },
        route: {
          route: 'data',
        },
        service: 'news',
        variant: undefined,
      });
    });
  });

  describe('unknown error route', () => {
    const route = { route: 'data', pageType: ERROR_PAGE };
    // This is the match returned for a 'catch all' route.
    const match = { path: '/', url: '/', params: {}, isExact: false };

    it('should return fallback service, isAmp and isApp. With catch-all route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([{ route, match }]);

      const methodCall = await getRouteProps('unknownURL');

      expect(getPathExtension).toHaveBeenCalledWith('unknownURL');

      expect(fallbackServiceParam).toHaveBeenCalledWith('unknownURL');

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true,
        isApp: true,
        isLite: true,
        match,
        route,
        service: 'fallbackService',
        variant: undefined,
      });
    });
  });

  /*
   * This behaviour should never happen, due to the catch-all error route
   * thats availible. This test however asserts that if that route isnt
   * availible, it fails gracefully.
   */
  describe('no matched route', () => {
    it('should return fallback service, amp and app with no route, match or Id', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([]);

      const methodCall = await getRouteProps('fakepath');

      expect(methodCall).toStrictEqual({
        assetUri: undefined,
        errorCode: undefined,
        id: undefined,
        isAmp: true,
        isApp: true,
        isLite: true,
        match: undefined,
        route: undefined,
        service: 'fallbackService',
        variant: undefined,
      });

      expect(getPathExtension).toHaveBeenCalled();

      expect(fallbackServiceParam).toHaveBeenCalled();
    });
  });
});
