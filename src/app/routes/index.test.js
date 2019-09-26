import routes from './index';
import { cpsAssetPageRegexPath } from './regex';

jest.mock('../containers/FrontPage', () => jest.fn());
jest.mock('../containers/MediaPage', () => jest.fn());

const generateFixtureData = type => ({
  data: {
    pageData: {
      metadata: {
        type,
      },
    },
  },
});

describe('Routes', () => {
  test('It should be an array', () => {
    expect(routes).toEqual(expect.any(Array));
  });

  test('All routes should have correct fields', () => {
    routes.forEach((route, index) => {
      expect(route).toEqual(expect.any(Object));
      expect(route).toHaveProperty('component');
      expect(route).toHaveProperty('pageType');

      // Last route should be catchall (no path specified) error page
      if (index === routes.length - 1) {
        expect(route.pageType).toEqual('error');
        expect(route).not.toHaveProperty('path');
      } else {
        expect(route).toHaveProperty('path');
      }
    });
  });

  describe('CPS Assets', () => {
    const cpsRoute = routes.filter(
      route => route.path === cpsAssetPageRegexPath,
    );

    const Component = cpsRoute[0].component;

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should route to MediaPage component', () => {
      const mediaPage = jest.requireMock('../containers/MediaPage');
      const frontPage = jest.requireMock('../containers/FrontPage');

      const data = generateFixtureData('MAP');
      Component(data);

      expect(mediaPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to FrontPage component', () => {
      const mediaPage = jest.requireMock('../containers/MediaPage');
      const frontPage = jest.requireMock('../containers/FrontPage');

      const data = generateFixtureData('FIX');
      Component(data);

      expect(frontPage).toHaveBeenCalled();
      expect(mediaPage).not.toHaveBeenCalled();
    });
  });
});
