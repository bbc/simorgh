import Cookie from 'js-cookie';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
  getTitle,
  getConfig,
} from '.';
import onClient from '../../../lib/utilities/onClient';
import * as articleUtils from '../../../lib/analyticsUtils/article';
import * as frontPageUtils from '../../../lib/analyticsUtils/frontpage';

let isOnClient = false;

jest.mock('../../../lib/utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

describe('Chartbeat utilities', () => {
  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });

  describe('Chartbeat ID Cookie', () => {
    it('should return null when onClient is false', () => {
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return null when ID cookie does not exist', () => {
      isOnClient = true;
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return the contents of the ID cookie when a value is present', () => {
      const expectedCookieValue = 'foobar';
      isOnClient = true;
      jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);
      expect(getSylphidCookie()).toBe(expectedCookieValue);
    });
  });

  describe('Chartbeat Page Type', () => {
    const types = [
      {
        type: 'article',
        expectedDefaultType: 'New Article',
        expectedShortType: 'ART',
      },
      {
        type: 'index',
        expectedDefaultType: 'Index',
        expectedShortType: 'IDX',
      },
      {
        type: null,
        expectedDefaultType: null,
        expectedShortType: null,
      },
    ];

    types.forEach(
      ({ type: rawType, expectedDefaultType, expectedShortType }) => {
        it(`Type ${rawType} should return ${expectedDefaultType} as default`, () => {
          expect(getType(rawType)).toBe(expectedDefaultType);
        });

        it(`Type ${rawType} should return ${expectedShortType} as shorthand`, () => {
          expect(getType(rawType, true)).toBe(expectedShortType);
        });
      },
    );
  });

  describe('Chartbeat Domains', () => {
    const services = [
      {
        service: 'news',
        expectedDomain: 'bbc.co.uk',
      },
      {
        service: 'persian',
        expectedDomain: 'persian.bbc.co.uk',
      },
      {
        service: 'igbo',
        expectedDomain: 'igbo.bbc.co.uk',
      },
      {
        service: 'thai',
        expectedDomain: 'thai.bbc.co.uk',
      },
    ];

    services.forEach(({ service, expectedDomain }) => {
      it(`getDomain should return "${expectedDomain}" when service is ${service}`, () => {
        expect(getDomain(service)).toBe(expectedDomain);
      });
    });
  });

  describe('Chartbeat Sections', () => {
    const sectionFixtures = [
      {
        service: 'news',
        producer: 'wales',
        chapter: 'election 2017',
        pageType: 'article',
        description: 'should add chapter and producer to article type',
        expected:
          'News, News - ART, News - wales, News - wales - ART, News - election 2017, News - election 2017 - ART',
      },
      {
        service: 'news',
        producer: 'business',
        chapter: 'market data',
        pageType: 'index',
        description: 'should add chapter and producer to index type',
        expected:
          'News, News - IDX, News - business, News - business - IDX, News - market data, News - market data - IDX',
      },
      {
        service: 'persian',
        producer: null,
        chapter: null,
        pageType: 'article',
        description: 'should not add chapter and producer when not present',
        expected: 'Persian, Persian - ART',
      },
      {
        service: 'news',
        producer: 'foo',
        chapter: null,
        pageType: 'article',
        description: 'should not add chapter when not present',
        expected: 'News, News - ART, News - foo, News - foo - ART',
      },
      {
        service: 'news',
        producer: null,
        chapter: 'bar',
        pageType: 'article',
        description: 'should not add producer when not present',
        expected: 'News, News - ART, News - bar, News - bar - ART',
      },
      {
        service: 'news',
        producer: 'news',
        chapter: 'baz',
        pageType: 'article',
        description: 'should not add producer when producer == service',
        expected: 'News, News - ART, News - baz, News - baz - ART',
      },
      {
        service: 'news',
        producer: 'business',
        chapter: 'foo',
        pageType: null,
        description: 'should not append pageType if not present',
        expected: 'News, News - business, News - foo',
      },
    ];

    sectionFixtures.forEach(
      ({ service, producer, chapter, pageType, description, expected }) => {
        it(description, () => {
          expect(buildSections(service, pageType, producer, chapter)).toBe(
            expected,
          );
        });
      },
    );
  });

  describe('Chartbeat Title', () => {
    it('should call getPromoHeadline when pageType is article', () => {
      const pageType = 'article';
      const pageData = {};

      const mockGetPromoHeadline = jest
        .fn()
        .mockImplementation(() => 'This is an article title');
      articleUtils.getPromoHeadline = mockGetPromoHeadline;
      expect(getTitle(pageType, pageData, null)).toBe(
        'This is an article title',
      );
      expect(mockGetPromoHeadline).toHaveBeenCalledTimes(1);
    });

    it('should call getPageTitle when pageType is frontPage', () => {
      const pageType = 'frontPage';
      const pageData = {};
      const brandName = 'BBC News';

      const mockGetPageTitle = jest
        .fn()
        .mockImplementation(() => 'This is a frontpage title');
      frontPageUtils.getPageTitle = mockGetPageTitle;
      expect(getTitle(pageType, pageData, brandName)).toBe(
        'This is a frontpage title',
      );
      expect(mockGetPageTitle).toHaveBeenCalledTimes(1);
    });

    it('should call getPageTitle when pageType is index', () => {
      const pageType = 'index';
      const pageData = {};
      const brandName = 'BBC News';

      const mockGetPageTitle = jest
        .fn()
        .mockImplementation(() => 'This is an index page title');
      frontPageUtils.getPageTitle = mockGetPageTitle;
      expect(getTitle(pageType, pageData, brandName)).toBe(
        'This is an index page title',
      );
      expect(mockGetPageTitle).toHaveBeenCalledTimes(1);
    });

    it('should default to null when no matching pageType', () => {
      const pageType = 'some page type';
      const pageData = {};
      const brandName = 'BBC News';

      expect(getTitle(pageType, pageData, brandName)).toBe(null);
    });
  });

  describe('Chartbeat Config', () => {
    isOnClient = true;
    it('should return config  for amp pages when page type is article and env is live', () => {
      const fixtureData = {
        platform: 'amp',
        pageType: 'article',
        data: {},
        brandName: '',
        env: 'live',
        service: 'news',
        origin: 'bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        contentType: 'New Article',
        domain: 'bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'News, News - ART',
        title: 'This is an article title',
        uid: 50924,
        virtualReferrer: `\${documentReferrer}`,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config  for canonical pages when page type is frontPage and env is not live', () => {
      const fixtureData = {
        platform: 'canonical',
        pageType: 'frontPage',
        data: {},
        brandName: 'BBC-News',
        env: 'test',
        service: 'news',
        origin: 'test.bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'News, News - IDX',
        title: 'This is an index page title',
        type: 'Index',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: 'test.bbc.com/previous-path',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });
  });
});
