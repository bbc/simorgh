import routes from './index';
import { cpsAssetPagePath, legacyAssetPagePath } from './regex';
import {
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  FEATURE_INDEX_PAGE,
} from './pageTypes';

jest.mock('#pages/FrontPage', () => jest.fn());
jest.mock('#pages/RadioPage', () => jest.fn());
jest.mock('#pages/MediaAssetPage', () => jest.fn());
jest.mock('#pages/CpsSty', () => jest.fn());
jest.mock('#pages/CpsPgl', () => jest.fn());

const generateFixtureData = type => ({
  pageData: {
    metadata: {
      type,
    },
  },
});

const mediaPage = jest.requireMock('#pages/MediaAssetPage');
const frontPage = jest.requireMock('#pages/FrontPage');
const storyPage = jest.requireMock('#pages/CpsSty');
const photoGalleryPage = jest.requireMock('#pages/CpsPgl');

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

    it('should route to MediaAssetPage component', () => {
      const data = generateFixtureData(MEDIA_ASSET_PAGE);
      Component(data);

      expect(mediaPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to CpsSty component', () => {
      const data = generateFixtureData(STORY_PAGE);
      Component(data);

      expect(storyPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to CpsPgl component', () => {
      const data = generateFixtureData(PHOTO_GALLERY_PAGE);
      Component(data);

      expect(photoGalleryPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to FrontPage component', () => {
      const data = generateFixtureData(FEATURE_INDEX_PAGE);
      Component(data);

      expect(mediaPage).not.toHaveBeenCalled();
      expect(frontPage).toHaveBeenCalled();
    });
  });

  describe('Legacy Assets', () => {
    const legacyRoute = routes.filter(
      route => route.path === legacyAssetPagePath,
    );

    const Component = legacyRoute[0].component;

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should route to MediaAssetPage component', () => {
      const data = generateFixtureData(MEDIA_ASSET_PAGE);
      Component(data);

      expect(mediaPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to CpsSty component', () => {
      const data = generateFixtureData(STORY_PAGE);
      Component(data);

      expect(storyPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });

    it('should route to CpsPgl component', () => {
      const data = generateFixtureData(PHOTO_GALLERY_PAGE);
      Component(data);

      expect(photoGalleryPage).toHaveBeenCalled();
      expect(frontPage).not.toHaveBeenCalled();
    });
  });
});
