import Cookie from 'js-cookie';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  buildSections,
  getType,
  getTitle,
  getConfig,
} from '.';
import onClient from '#lib/utilities/onClient';
import * as articleUtils from '#lib/analyticsUtils/article';
import * as frontPageUtils from '#lib/analyticsUtils/indexPage';

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
        type: 'FIX',
        expectedDefaultType: 'FIX',
        expectedShortType: 'FIX',
      },
      {
        type: 'MAP',
        expectedDefaultType: 'article-media-asset',
        expectedShortType: 'article-media-asset',
      },
      {
        type: 'media',
        expectedDefaultType: 'Radio',
        expectedShortType: 'Radio',
      },
      {
        type: 'mostRead',
        expectedDefaultType: 'Most Read',
        expectedShortType: 'Most Read',
      },
      {
        type: 'mostWatched',
        expectedDefaultType: 'Most Watched',
        expectedShortType: 'Most Watched',
      },
      {
        type: 'STY',
        expectedDefaultType: 'STY',
        expectedShortType: 'STY',
      },
      {
        type: 'PGL',
        expectedDefaultType: 'PGL',
        expectedShortType: 'PGL',
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
      {
        service: 'afrique',
        sectionName: 'Media',
        categoryName: 'News',
        pageType: 'MAP',
        description: 'should add section and category to MAPs',
        expected:
          'Afrique, Afrique - Media, Afrique - MAP, Afrique - Media - MAP, Afrique - News-category',
      },
      {
        service: 'korean',
        pageType: 'media',
        description: 'should return expected section for live radio',
        masterBrand: 'bbc_korean_radio',
        expected: 'Korean, Korean - Radio',
      },
      {
        service: 'indonesia',
        pageType: 'media',
        description: 'should return expected section for onDemand radio',
        masterBrand: 'bbc_indonesian_radio',
        expected: 'Indonesia, Indonesia - Radio',
      },
      {
        service: 'pashto',
        pageType: 'media',
        description: 'should return expected section for ondemand TV',
        masterBrand: 'bbc_pashto_tv',
        expected: 'Pashto, Pashto - TV',
      },
      {
        service: 'mundo',
        sectionName: 'STY',
        categoryName: 'mundo',
        pageType: 'STY',
        description: 'should add section and category to STYs',
        expected:
          'Mundo, Mundo - STY, Mundo - STY, Mundo - STY - STY, Mundo - mundo-category',
      },
    ];

    sectionFixtures.forEach(
      ({
        service,
        producer,
        chapter,
        pageType,
        description,
        expected,
        sectionName,
        categoryName,
        masterBrand,
      }) => {
        it(description, () => {
          expect(
            buildSections({
              service,
              pageType,
              producer,
              chapter,
              sectionName,
              categoryName,
              masterBrand,
            }),
          ).toBe(expected);
        });
      },
    );
  });

  describe('Chartbeat Title', () => {
    it('should return correct title when pageType is mostRead', () => {
      const pageType = 'mostRead';
      const pageData = {};
      const brandName = 'BBC News 코리아';
      const title = 'TOP 뉴스';

      expect(getTitle({ pageType, pageData, brandName, title })).toBe(
        'TOP 뉴스 - BBC News 코리아',
      );
    });

    it('should return correct title when pageType is mostWatched', () => {
      const pageType = 'mostWatched';
      const pageData = {};
      const brandName = 'BBC News Afaan Oromoo';
      const title = 'Hedduu kan ilaalaman';

      expect(getTitle({ pageType, pageData, brandName, title })).toBe(
        'Hedduu kan ilaalaman - BBC News Afaan Oromoo',
      );
    });

    test.each`
      pageType       | brandName        | pageTitle                        | expectedNumberOfCalls
      ${'index'}     | ${'BBC News'}    | ${'This is an index page title'} | ${1}
      ${'IDX'}       | ${'BBC Persian'} | ${'This is an IDX page title'}   | ${1}
      ${'FIX'}       | ${'BBC Afrique'} | ${'This is an FIX page title'}   | ${1}
      ${'frontPage'} | ${'BBC News'}    | ${'This is a frontpage title'}   | ${1}
      ${'article'}   | ${null}          | ${'This is an article title'}    | ${1}
      ${'foo'}       | ${'BBC News'}    | ${null}                          | ${0}
    `(
      'should call getPageTitle when pageType is $pageType',
      ({ brandName, pageType, pageTitle, expectedNumberOfCalls }) => {
        const pageData = {};

        const mockTitle = jest.fn().mockImplementation(() => pageTitle);

        if (pageType === 'article') {
          articleUtils.getPromoHeadline = mockTitle;
        } else {
          frontPageUtils.getPageTitle = mockTitle;
        }

        expect(getTitle({ pageType, pageData, brandName })).toBe(pageTitle);

        expect(mockTitle).toHaveBeenCalledTimes(expectedNumberOfCalls);
      },
    );

    test.each`
      pageType   | context               | pageTitle
      ${'media'} | ${'(onDemand TV)'}    | ${'OnDemand TV Page Title'}
      ${'media'} | ${'(onDemand Radio)'} | ${'OnDemand TV Radio Title'}
      ${'media'} | ${'(Live Radio)'}     | ${'Live Radio Title'}
    `(
      'should return correct title when pageType is $pageType $context',
      ({ pageType, pageTitle }) => {
        const pageData = {
          pageTitle,
        };

        expect(getTitle({ pageType, pageData })).toBe(pageTitle);
      },
    );

    test.each`
      pageType | pageTitle
      ${'PGL'} | ${'PGL Page Title'}
      ${'STY'} | ${'STY Page Title'}
      ${'MAP'} | ${'MAP Page Title'}
    `(
      'should return correct title when pageType is $pageType',
      ({ pageType, pageTitle }) => {
        const pageData = {
          promo: {
            headlines: {
              headline: pageTitle,
            },
          },
        };

        expect(getTitle({ pageType, pageData })).toBe(pageTitle);
      },
    );
  });

  describe('Chartbeat Config', () => {
    isOnClient = true;
    it('should return config for amp pages when page type is article and env is live', () => {
      const fixtureData = {
        isAmp: true,
        platform: 'amp',
        pageType: 'article',
        data: {},
        brandName: '',
        chartbeatDomain: 'bbc.co.uk',
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

    it('should return config for canonical pages when page type is frontPage and env is not live', () => {
      const fixtureData = {
        isAmp: false,
        platform: 'canonical',
        pageType: 'frontPage',
        data: {},
        brandName: 'BBC-News',
        chartbeatDomain: 'bbc.co.uk',
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

      const mockTitle = jest
        .fn()
        .mockImplementation(() => 'This is an index page title');

      frontPageUtils.getPageTitle = mockTitle;

      const expectedCookieValue = 'foobar';
      jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for canonical pages when page type is MAP and env is live', () => {
      const fixtureData = {
        isAmp: false,
        platform: 'canonical',
        pageType: 'MAP',
        data: {
          promo: {
            headlines: {
              headline: 'MAP Page Title',
            },
          },
          relatedContent: {
            section: {
              name: 'Media',
            },
          },
          metadata: {
            passport: {
              category: {
                categoryName: 'News',
              },
            },
          },
        },
        brandName: '',
        chartbeatDomain: 'afrique.bbc.co.uk',
        env: 'live',
        service: 'afrique',
        origin: 'bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        domain: 'afrique.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections:
          'Afrique, Afrique - Media, Afrique - MAP, Afrique - Media - MAP, Afrique - News-category',
        title: 'MAP Page Title',
        type: 'article-media-asset',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: 'bbc.com/previous-path',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for amp pages when page type is media (live radio) and env is not live', () => {
      const fixtureData = {
        isAmp: true,
        platform: 'amp',
        pageType: 'media',
        data: {
          pageTitle: 'Live Radio Page Title',
          contentType: 'player-live',
          masterBrand: 'bbc_korean_radio',
        },
        brandName: '',
        chartbeatDomain: 'korean.bbc.co.uk',
        env: 'test',
        service: 'korean',
        origin: 'test.bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'Korean, Korean - Radio',
        title: 'Live Radio Page Title',
        contentType: 'player-live',
        uid: 50924,
        virtualReferrer: `\${documentReferrer}`,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for amp pages when page type is STY and env is live', () => {
      const fixtureData = {
        isAmp: true,
        platform: 'amp',
        pageType: 'STY',
        data: {
          promo: {
            headlines: {
              headline: 'STY Page Title',
            },
          },
          relatedContent: {
            section: {
              name: 'STY',
            },
          },
          metadata: {
            passport: {
              category: {
                categoryName: 'mundo',
              },
            },
          },
        },
        brandName: 'BBC News Mundo',
        chartbeatDomain: 'mundo.bbc.co.uk',
        env: 'live',
        service: 'mundo',
        origin: 'bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        contentType: 'STY',
        domain: 'mundo.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections:
          'Mundo, Mundo - STY, Mundo - STY, Mundo - STY - STY, Mundo - mundo-category',
        title: 'STY Page Title',
        uid: 50924,
        virtualReferrer: `\${documentReferrer}`,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for canonical pages when page type is STY and env is not live', () => {
      const fixtureData = {
        isAmp: false,
        platform: 'canonical',
        pageType: 'STY',
        data: {
          promo: {
            headlines: {
              headline: 'STY Page Title',
            },
          },
          relatedContent: {
            section: {
              name: 'STY',
            },
          },
          metadata: {
            passport: {
              category: {
                categoryName: 'mundo',
              },
            },
          },
        },
        brandName: 'BBC News Mundo',
        chartbeatDomain: 'mundo.bbc.co.uk',
        env: 'test',
        service: 'mundo',
        origin: 'test.bbc.com',
        previousPath: '/previous-path',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections:
          'Mundo, Mundo - STY, Mundo - STY, Mundo - STY - STY, Mundo - mundo-category',
        type: 'STY',
        title: 'STY Page Title',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: 'test.bbc.com/previous-path',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });
  });

  it('should return config for amp pages when page type is media (onDemand radio) and env is live', () => {
    const fixtureData = {
      isAmp: true,
      platform: 'amp',
      pageType: 'media',
      data: {
        pageTitle: 'OnDemand Radio Page Title',
        contentType: 'player-episode',
        masterBrand: 'bbc_korean_radio',
      },
      brandName: '',
      chartbeatDomain: 'korean.bbc.co.uk',
      env: 'live',
      service: 'korean',
      origin: 'bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'korean.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      sections: 'Korean, Korean - Radio',
      title: 'OnDemand Radio Page Title',
      contentType: 'player-episode',
      uid: 50924,
      virtualReferrer: `\${documentReferrer}`,
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for amp pages when page type is media (onDemand TV) and env is live', () => {
    const fixtureData = {
      isAmp: true,
      platform: 'amp',
      pageType: 'media',
      data: {
        pageTitle: 'OnDemand TV Page Title',
        contentType: 'player-episode',
        masterBrand: 'bbc_pashto_tv',
      },
      brandName: '',
      chartbeatDomain: 'pashto.bbc.co.uk',
      env: 'live',
      service: 'pashto',
      origin: 'bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'pashto.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      sections: 'Pashto, Pashto - TV',
      title: 'OnDemand TV Page Title',
      contentType: 'player-episode',
      uid: 50924,
      virtualReferrer: `\${documentReferrer}`,
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is media (onDemand TV) and env is live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'media',
      data: {
        pageTitle: 'OnDemand TV Page Title',
        contentType: 'player-episode',
        masterBrand: 'bbc_pashto_tv',
      },
      brandName: '',
      chartbeatDomain: 'pashto.bbc.co.uk',
      env: 'live',
      service: 'pashto',
      origin: 'bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'pashto.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      sections: 'Pashto, Pashto - TV',
      title: 'OnDemand TV Page Title',
      type: 'player-episode',
      uid: 50924,
      virtualReferrer: 'bbc.com/previous-path',
      useCanonical: true,
      path: '/',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is mostRead and env is not live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'mostRead',
      data: {
        name: 'Most Read Page Title',
      },
      brandName: 'BBC News 코리아',
      mostReadTitle: 'TOP 뉴스',
      chartbeatDomain: 'korean.bbc.co.uk',
      env: 'test',
      service: 'korean',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Korean, Korean - Most Read',
      type: 'Most Read',
      title: 'TOP 뉴스 - BBC News 코리아',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is mostWatched and env is not live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'mostWatched',
      data: {
        name: 'Most Watched Page Title',
      },
      brandName: 'BBC News Afaan Oromoo',
      mostWatchedTitle: 'Hedduu kan ilaalaman',
      chartbeatDomain: 'afaanoromoo.bbc.co.uk',
      env: 'test',
      service: 'afaanoromoo',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Afaanoromoo, Afaanoromoo - Most Watched',
      type: 'Most Watched',
      title: 'Hedduu kan ilaalaman - BBC News Afaan Oromoo',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is IDX and env is not live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'IDX',
      data: {},
      brandName: 'BBC-Persian',
      chartbeatDomain: 'bbc.co.uk',
      env: 'test',
      service: 'persian',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Persian, Persian - IDX',
      title: 'This is an index page title',
      type: 'Index',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    const mockTitle = jest
      .fn()
      .mockImplementation(() => 'This is an index page title');

    frontPageUtils.getPageTitle = mockTitle;

    const expectedCookieValue = 'foobar';
    jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is FIX and env is not live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'FIX',
      data: {},
      brandName: 'BBC-Afique',
      chartbeatDomain: 'bbc.co.uk',
      env: 'test',
      service: 'afrique',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Afrique, Afrique - FIX',
      title: 'This is a Feature Index page title',
      type: 'FIX',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    const mockTitle = jest
      .fn()
      .mockImplementation(() => 'This is a Feature Index page title');

    frontPageUtils.getPageTitle = mockTitle;

    const expectedCookieValue = 'foobar';
    jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is IDX and env is not live', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'IDX',
      data: {},
      brandName: 'BBC-Persian',
      chartbeatDomain: 'bbc.co.uk',
      env: 'test',
      service: 'persian',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Persian, Persian - IDX',
      title: 'This is an index page title',
      type: 'Index',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    const mockTitle = jest
      .fn()
      .mockImplementation(() => 'This is an index page title');

    frontPageUtils.getPageTitle = mockTitle;

    const expectedCookieValue = 'foobar';
    jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return null for virtualReferrer when there is no previousPath', () => {
    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'frontPage',
      data: {},
      brandName: 'BBC-News',
      chartbeatDomain: 'bbc.co.uk',
      env: 'test',
      service: 'news',
      origin: 'test.bbc.com',
    };

    const chartbeatConfig = getConfig(fixtureData);
    expect(chartbeatConfig.virtualReferrer).toBeNull();
  });

  it('should return null for virtualReferrer when isOnClient is false', () => {
    isOnClient = false;

    const fixtureData = {
      isAmp: false,
      platform: 'canonical',
      pageType: 'frontPage',
      data: {},
      brandName: 'BBC-News',
      chartbeatDomain: 'bbc.co.uk',
      env: 'test',
      service: 'news',
      origin: 'test.bbc.com',
    };

    const chartbeatConfig = getConfig(fixtureData);
    expect(chartbeatConfig.virtualReferrer).toBeNull();
  });
});
