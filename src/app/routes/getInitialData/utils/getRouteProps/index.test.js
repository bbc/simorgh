import reactRouterConfig from 'react-router-config';
import getRouteProps from '.';
import * as routeFallbackParams from './routeFallbackParams';

jest.mock('react-router-config');

jest.mock('./routeFallbackParams', () => ({
  fallbackAmpParam: jest.fn().mockImplementation(() => true),
  fallbackServiceParam: jest.fn().mockImplementation(() => 'fallbackService'),
}));

describe('getRouteProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('no matched route', () => {
    it('should return an empty object', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([]);

      try {
        await getRouteProps([], 'fake url');
      } catch (error) {
        expect(error).toMatchSnapshot();
      }

      expect(routeFallbackParams.fallbackAmpParam).not.toHaveBeenCalled();
      expect(routeFallbackParams.fallbackServiceParam).not.toHaveBeenCalled();
    });
  });

  describe('valid route', () => {
    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: undefined } },
        },
      ]);

      const methodCall = await getRouteProps([], 'url');

      expect(routeFallbackParams.fallbackAmpParam).not.toHaveBeenCalled();
      expect(routeFallbackParams.fallbackServiceParam).not.toHaveBeenCalled();

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
  });

  describe('valid amp route', () => {
    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: '.amp' } },
        },
      ]);

      const methodCall = await getRouteProps([], 'url');

      expect(routeFallbackParams.fallbackAmpParam).not.toHaveBeenCalled();
      expect(routeFallbackParams.fallbackServiceParam).not.toHaveBeenCalled();

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
    const route = { route: 'data', pageType: 'error' };
    // This is the match returned for a 'catch all' route.
    const match = { path: '/', url: '/', params: {}, isExact: false };

    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes.mockReturnValue([{ route, match }]);

      const methodCall = await getRouteProps([], 'unknownURL');

      expect(routeFallbackParams.fallbackAmpParam).toHaveBeenCalledWith(
        'unknownURL',
      );
      expect(routeFallbackParams.fallbackServiceParam).toHaveBeenCalledWith(
        'unknownURL',
      );

      expect(methodCall).toEqual({
        isAmp: true,
        match,
        route,
        service: 'fallbackService',
      });
    });
  });
});
