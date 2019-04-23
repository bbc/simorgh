/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import * as reactRouterConfig from 'react-router-config';
import loadInitialData from '.';
import getDials from './getDials';

jest.mock('./getDials');

describe('loadInitialData', () => {
  const data = { data: 'Some data!' };
  const match = { match: true };

  describe('no matched route', () => {
    it('should return an empty object', async () => {
      reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([]);

      try {
        await loadInitialData('url', []);
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });

  describe('no getInitialData function on route', () => {
    it('should return an empty object', async () => {
      reactRouterConfig.matchRoutes = jest
        .fn()
        .mockReturnValue([
          { route: { route: 'data' }, match: { match: true } },
        ]);

      const initialData = await loadInitialData('url', ['url']);

      expect(initialData).toEqual({});
    });
  });

  describe('getInitialData function on route', () => {
    it('should call getInitialData with passed ctx, inject dials and return value', async () => {
      const route = {
        getInitialData: jest
          .fn()
          .mockImplementation(() => Promise.resolve({ ...data })),
      };
      const dials = { dial: 'value' };
      const expectedObject = { ...data, dials };

      getDials.mockReturnValue(dials);

      reactRouterConfig.matchRoutes = jest
        .fn()
        .mockReturnValue([{ route, match }]);

      const initialData = await loadInitialData('url', ['url']);

      expect(route.getInitialData).toHaveBeenCalledTimes(1);
      expect(route.getInitialData).toHaveBeenCalledWith({ match });
      expect(getDials).toHaveBeenCalledTimes(1);
      expect(initialData).toEqual(expectedObject);
    });

    describe('error on getInitialData call', () => {
      it('should throw an error', async () => {
        const error = 'Error!';
        const route = {
          getInitialData: jest
            .fn()
            .mockImplementation(() => Promise.reject(error)),
        };

        reactRouterConfig.matchRoutes = jest
          .fn()
          .mockReturnValue([{ route, match }]);

        try {
          await loadInitialData(route, {});
        } catch (err) {
          expect(err).toEqual(error);
        }

        expect(route.getInitialData).toHaveBeenCalledTimes(1);
      });
    });
  });
});
