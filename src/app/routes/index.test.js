import routes from './index';
import {
  cpsAssetPagePath,
  legacyAssetPagePath,
  articlePath,
  radioAndTvPath,
  frontPagePath,
  errorPagePath,
} from './regex';
import {
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  FEATURE_INDEX_PAGE,
  INDEX_PAGE,
  ARTICLE_PAGE,
  LIVE_RADIO_PAGE,
} from './pageTypes';

jest.mock('#pages/Article', () => jest.fn());
jest.mock('#pages/FrontPage', () => jest.fn());
jest.mock('#pages/RadioPage', () => jest.fn());
jest.mock('#pages/MediaAssetPage', () => jest.fn());
jest.mock('#pages/CpsSty', () => jest.fn());
jest.mock('#pages/CpsPgl', () => jest.fn());
jest.mock('#pages/Error', () => jest.fn());

const generateFixtureData = type => ({
  pageData: {
    metadata: {
      type,
    },
  },
});

const articlePage = jest.requireMock('#pages/Article');
const mediaPage = jest.requireMock('#pages/MediaAssetPage');
const frontPage = jest.requireMock('#pages/FrontPage');
const storyPage = jest.requireMock('#pages/CpsSty');
const photoGalleryPage = jest.requireMock('#pages/CpsPgl');
const radioPage = jest.requireMock('#pages/RadioPage');
const errorPage = jest.requireMock('#pages/Error');

describe('Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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

  it('should route to Error component', () => {
    const errorRoute = routes.filter(route => route.path === errorPagePath);

    const Component = errorRoute[0].component;

    const data = generateFixtureData('ERROR');
    Component(data);

    expect(errorPage).toHaveBeenCalled();
    expect(frontPage).not.toHaveBeenCalled();
  });
  it('should route to FrontPage component', () => {
    const frontPageRoute = routes.filter(route => route.path === frontPagePath);

    const Component = frontPageRoute[0].component;

    const data = generateFixtureData(INDEX_PAGE);
    Component(data);

    expect(frontPage).toHaveBeenCalled();
  });

  it('should route to Article component', () => {
    const articleRoute = routes.filter(route => route.path === articlePath);

    const Component = articleRoute[0].component;

    const data = generateFixtureData(ARTICLE_PAGE);
    Component(data);

    expect(articlePage).toHaveBeenCalled();
    expect(frontPage).not.toHaveBeenCalled();
  });

  it('should route to RadioPage component', () => {
    const radioRoute = routes.filter(route => route.path === radioAndTvPath);

    const Component = radioRoute[0].component;

    const data = generateFixtureData(LIVE_RADIO_PAGE);
    Component(data);

    expect(radioPage).toHaveBeenCalled();
    expect(frontPage).not.toHaveBeenCalled();
  });

  describe('CPS Assets', () => {
    const cpsRoute = routes.filter(route => route.path === cpsAssetPagePath);

    const Component = cpsRoute[0].component;

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

      expect(frontPage).toHaveBeenCalled();
    });

    it('should fallback to Error component', () => {
      const data = generateFixtureData('ERROR');
      Component(data);

      expect(errorPage).toHaveBeenCalled();
    });
  });

  describe('Legacy Assets', () => {
    const legacyRoute = routes.filter(
      route => route.path === legacyAssetPagePath,
    );

    const Component = legacyRoute[0].component;

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

      expect(frontPage).toHaveBeenCalled();
    });

    it('should fallback to Error component', () => {
      const data = generateFixtureData('ERROR');
      Component(data);

      expect(errorPage).toHaveBeenCalled();
    });
  });
});
