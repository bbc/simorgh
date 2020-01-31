import routes from './index';
import { cpsAssetPagePath } from './regex';

jest.mock('#pages/FrontPage', () => jest.fn());
jest.mock('#pages/RadioPage', () => jest.fn());
jest.mock('#pages/CpsMap', () => jest.fn());

const generateFixtureData = type => ({
  pageData: {
    metadata: {
      type,
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
    const cpsRoute = routes.filter(route => route.path === cpsAssetPagePath);

    const Component = cpsRoute[0].component;

    beforeEach(() => {
      jest.resetAllMocks();
    });

    const mediaPage = jest.requireMock('#pages/CpsMap');
    const frontPage = jest.requireMock('#pages/FrontPage');

    it('should route to CpsMap component', () => {
      const data = generateFixtureData('MAP');
      Component(data);

      expect(mediaPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to FrontPage component', () => {
      const data = generateFixtureData('FIX');
      Component(data);

      expect(mediaPage).not.toHaveBeenCalled();
      expect(frontPage).toHaveBeenCalled();
    });
  });
});
