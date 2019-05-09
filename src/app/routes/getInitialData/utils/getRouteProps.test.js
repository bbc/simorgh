import * as reactRouterConfig from 'react-router-config';
import getRouteProps from './getRouteProps';

describe('getRouteProps', () => {
  describe('no matched route', () => {
    it('should return an empty object', async () => {
      reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([]);

      try {
        await getRouteProps([], 'fake url');
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });

  describe('valid route', () => {
    it('should return service, isAmp, route and match', async () => {
      reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: undefined } },
        },
      ]);

      const methodCall = await getRouteProps('url', ['url']);

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
      reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([
        {
          route: { route: 'data' },
          match: { params: { service: 'news', amp: '.amp' } },
        },
      ]);

      const methodCall = await getRouteProps('url', ['url']);

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
});
