import Cookie from 'js-cookie';
import onClient from '../../../lib/utilities/onClient';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  TOPIC_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '../../../routes/utils/pageTypes';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  buildSections,
  getType,
  getTitle,
  getConfig,
  GetConfigProps,
} from '.';
import { PageTypes, Services } from '../../../models/types/global';

let isOnClient = false;

jest.mock('../../../lib/utilities/onClient', () => jest.fn());
(onClient as jest.Mock).mockImplementation(() => isOnClient);

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
      (jest.spyOn(Cookie, 'get') as jest.Mock).mockImplementation(
        () => expectedCookieValue,
      );
      expect(getSylphidCookie()).toBe(expectedCookieValue);
    });
  });

  describe('Chartbeat Page Type', () => {
    const types = [
      {
        pageType: ARTICLE_PAGE,
        expectedDefaultType: 'New Article',
        expectedShortType: 'ART',
      },
      {
        pageType: MEDIA_ARTICLE_PAGE,
        expectedDefaultType: 'article-sfv',
        expectedShortType: 'article-sfv',
      },
      {
        pageType: 'index',
        expectedDefaultType: 'Index',
        expectedShortType: INDEX_PAGE,
      },
      {
        pageType: FEATURE_INDEX_PAGE,
        expectedDefaultType: FEATURE_INDEX_PAGE,
        expectedShortType: FEATURE_INDEX_PAGE,
      },
      {
        pageType: MEDIA_ASSET_PAGE,
        expectedDefaultType: 'article-media-asset',
        expectedShortType: 'article-media-asset',
      },
      {
        pageType: MEDIA_PAGE,
        expectedDefaultType: 'Radio',
        expectedShortType: 'Radio',
      },
      {
        pageType: MOST_READ_PAGE,
        expectedDefaultType: 'Most Read',
        expectedShortType: 'Most Read',
      },
      {
        pageType: MOST_WATCHED_PAGE,
        expectedDefaultType: 'Most Watched',
        expectedShortType: 'Most Watched',
      },
      {
        pageType: STORY_PAGE,
        expectedDefaultType: STORY_PAGE,
        expectedShortType: STORY_PAGE,
      },
      {
        pageType: PHOTO_GALLERY_PAGE,
        expectedDefaultType: PHOTO_GALLERY_PAGE,
        expectedShortType: PHOTO_GALLERY_PAGE,
      },
      {
        pageType: TOPIC_PAGE,
        expectedDefaultType: 'Topics',
        expectedShortType: 'Topics',
      },
      {
        pageType: null,
        expectedDefaultType: null,
        expectedShortType: null,
      },
    ];

    types.forEach(
      ({ pageType: rawPageType, expectedDefaultType, expectedShortType }) => {
        it(`Page type ${rawPageType} should return ${expectedDefaultType} as default`, () => {
          // @ts-expect-error testing null values to ensure behaviour is as expected
          expect(getType(rawPageType)).toBe(expectedDefaultType);
        });

        it(`Page type ${rawPageType} should return ${expectedShortType} as shorthand`, () => {
          // @ts-expect-error testing null values to ensure behaviour is as expected
          expect(getType(rawPageType, true)).toBe(expectedShortType);
        });
      },
    );
  });

  interface SectionFixtures {
    service: Services;
    pageType: PageTypes | 'index' | null;
    sectionName?: string;
    categoryName?: string;
    mediaPageType?: string;
    description: string;
    expected: string;
  }

  describe('Chartbeat Sections', () => {
    const sectionFixtures: SectionFixtures[] = [
      {
        service: 'afrique',
        sectionName: 'Media',
        categoryName: 'News',
        pageType: MEDIA_ASSET_PAGE,
        description: 'should add section and category to MAPs',
        expected:
          'Afrique, Afrique - MAP, Afrique - Media, Afrique - Media - MAP, Afrique - News-category',
      },
      {
        service: 'korean',
        pageType: MEDIA_PAGE,
        description: 'should return expected section for live radio',
        mediaPageType: 'Radio',
        expected: 'Korean, Korean - Radio',
      },
      {
        service: 'indonesia',
        pageType: MEDIA_PAGE,
        description: 'should return expected section for onDemand radio',
        mediaPageType: 'Radio',
        expected: 'Indonesia, Indonesia - Radio',
      },
      {
        service: 'pashto',
        pageType: MEDIA_PAGE,
        description: 'should return expected section for ondemand TV',
        mediaPageType: 'TV',
        expected: 'Pashto, Pashto - TV',
      },
      {
        service: 'mundo',
        sectionName: STORY_PAGE,
        categoryName: 'mundo',
        pageType: STORY_PAGE,
        description: 'should add section and category to STYs',
        expected:
          'Mundo, Mundo - STY, Mundo - STY, Mundo - STY - STY, Mundo - mundo-category',
      },
      {
        service: 'mundo',
        pageType: TOPIC_PAGE,
        description: 'should return expected section for topic page',
        expected: 'Mundo, Mundo - Topics',
      },
    ];

    sectionFixtures.forEach(
      ({
        service,
        pageType,
        description,
        expected,
        sectionName,
        categoryName,
        mediaPageType,
      }) => {
        it(description, () => {
          expect(
            buildSections({
              service,
              // @ts-expect-error allow null values for page type to ensure correct behaviour
              pageType,
              sectionName,
              categoryName,
              mediaPageType,
            }),
          ).toBe(expected);
        });
      },
    );
  });

  describe('Chartbeat Title', () => {
    it('should return correct title when pageType is mostRead', () => {
      const pageType = MOST_READ_PAGE;
      const brandName = 'BBC News 코리아';
      const title = 'TOP 뉴스';

      expect(getTitle({ pageType, brandName, title })).toBe(
        'TOP 뉴스 - BBC News 코리아',
      );
    });

    it('should return correct title when pageType is mostWatched', () => {
      const pageType = MOST_WATCHED_PAGE;
      const brandName = 'BBC News Afaan Oromoo';
      const title = 'Hedduu kan ilaalaman';

      expect(getTitle({ pageType, brandName, title })).toBe(
        'Hedduu kan ilaalaman - BBC News Afaan Oromoo',
      );
    });

    test.each`
      pageType              | title                         | brandName                    | expected
      ${FRONT_PAGE}         | ${'Front Page Title'}         | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${INDEX_PAGE}         | ${'Index Page Title'}         | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${FEATURE_INDEX_PAGE} | ${'Feature Index Page Title'} | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${MOST_READ_PAGE}     | ${'Most Read Page Title'}     | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${MOST_WATCHED_PAGE}  | ${'Most Watched Page Title'}  | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${TOPIC_PAGE}         | ${'Topic Page Title'}         | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${LIVE_PAGE}          | ${'Live Page Title'}          | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${'index'}            | ${'index Page Title'}         | ${'BBC News Pidgin'}              | ${'Front Page Title - BBC News Pidgin'}
      ${MEDIA_PAGE}         | ${'Media Page Title'}             | ${'BBC News Pidgin'}| ${'Media Page Title - BBC News Pidgin'}
    `(
      'should return correct title when pageType is $pageType and brandName is $brandName',
      ({ pageType, title, brandName, expected }) => {
        expect(getTitle({ pageType, brandName, title })).toBe(expected);
      },
    );

    test.each`
      pageType              | pageTitle
      ${PHOTO_GALLERY_PAGE} | ${'PGL Page Title'}
      ${STORY_PAGE}         | ${'STY Page Title'}
      ${MEDIA_ASSET_PAGE}   | ${'MAP Page Title'}
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

    it('should return correct title when pageType is TOPIC_PAGE', () => {
      const pageData = {
        title: 'Topic Page Title',
      };
      const pageType = TOPIC_PAGE;
      const brandName = 'BBC Brand Name';
      expect(getTitle({ pageType, pageData, brandName })).toBe(
        'Topic Page Title - BBC Brand Name',
      );
    });
  });

  describe('Chartbeat Config', () => {
    isOnClient = true;
    it('should return config for amp pages when page type is article and env is live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: true,
        platform: 'amp',
        pageType: ARTICLE_PAGE,
        title: 'This is an article title',
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
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: FRONT_PAGE,
        title: 'This is an index page title',
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

      const expectedCookieValue = 'foobar';
      (jest.spyOn(Cookie, 'get') as jest.Mock).mockImplementation(
        () => expectedCookieValue,
      );

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for canonical pages when page type is MAP and env is live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: MEDIA_ASSET_PAGE,
        sectionName: 'Media',
        categoryName: 'News',
        title: 'MAP Page Title',
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
          'Afrique, Afrique - MAP, Afrique - Media, Afrique - Media - MAP, Afrique - News-category',
        title: 'MAP Page Title',
        type: 'article-media-asset',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: 'bbc.com/previous-path',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for amp pages when page type is media (live radio) and env is not live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: true,
        platform: 'amp',
        pageType: MEDIA_PAGE,
        mediaPageType: 'Radio',
        title: 'Live Radio Page Title',
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
      const fixtureData: GetConfigProps = {
        isAmp: true,
        platform: 'amp',
        pageType: STORY_PAGE,
        data: {
          promo: {
            headlines: {
              headline: 'STY Page Title',
            },
          },
          relatedContent: {
            section: {
              name: STORY_PAGE,
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
        contentType: STORY_PAGE,
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
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: STORY_PAGE,
        data: {
          promo: {
            headlines: {
              headline: 'STY Page Title',
            },
          },
          relatedContent: {
            section: {
              name: STORY_PAGE,
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
        type: STORY_PAGE,
        title: 'STY Page Title',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: 'test.bbc.com/previous-path',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });
  });

  describe('Chartbeat Media Article Page - article-sfv', () => {
    it("should have 'video' in its identifier when the primary media type is video", () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        pageType: MEDIA_ARTICLE_PAGE,
        data: {
          metadata: {
            passport: {
              taggings: [
                {
                  predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
                  value:
                    'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
                },
                {
                  predicate:
                    'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
                  value:
                    'http://www.bbc.co.uk/things/ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f#id',
                },
              ],
            },
          },
        },
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - video',
        title: null,
        type: 'article-sfv',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it("should have 'audio' in its identifier when the primary media type is audio", () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        pageType: MEDIA_ARTICLE_PAGE,
        data: {
          metadata: {
            passport: {
              taggings: [
                {
                  predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
                  value:
                    'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
                },
                {
                  predicate:
                    'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
                  value:
                    'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
                },
              ],
            },
          },
        },
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - audio',
        title: null,
        type: 'article-sfv',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it("should have 'article-sfv' in its identifier when there are no taggings", () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        pageType: MEDIA_ARTICLE_PAGE,
        data: {
          metadata: {
            passport: {},
          },
        },
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - article-sfv',
        title: null,
        type: 'article-sfv',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it("should have 'article-sfv' in its identifier when the primary media type cannot be established", () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        pageType: MEDIA_ARTICLE_PAGE,
        data: {
          metadata: {
            passport: {
              taggings: [
                {
                  predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
                  value:
                    'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
                },
                {
                  predicate:
                    'http://www.bbc.co.uk/ontologies/bbc/SOME_OTHER_TAG',
                  value:
                    'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
                },
              ],
            },
          },
        },
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - article-sfv',
        title: null,
        type: 'article-sfv',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should not intefere with regular article page identifiers', () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        pageType: ARTICLE_PAGE,
        data: {
          metadata: {
            passport: {},
          },
        },
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - ART',
        title: 'This is an article title',
        type: 'New Article',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });
  });

  it('should return config for amp pages when page type is media (onDemand radio) and env is live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: true,
      platform: 'amp',
      pageType: MEDIA_PAGE,
      mediaPageType: 'Radio',
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
    const fixtureData: GetConfigProps = {
      isAmp: true,
      platform: 'amp',
      pageType: MEDIA_PAGE,
      mediaPageType: 'TV',
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
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: MEDIA_PAGE,
      mediaPageType: 'TV',
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

  it('should return config for canonical pages when page type is podcast and env is live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: MEDIA_PAGE,
      mediaPageType: 'Podcasts',
      brandName: '',
      chartbeatDomain: 'arabic.bbc.co.uk',
      env: 'live',
      service: 'arabic',
      origin: 'bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'arabic.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      sections: 'Arabic, Arabic - Podcasts',
      title: 'Podcast Page Title',
      type: 'player-episode',
      uid: 50924,
      virtualReferrer: 'bbc.com/previous-path',
      useCanonical: true,
      path: '/',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return correct canonical config for Topic pages on test', () => {
    // @ts-expect-error testing partial data to ensure behaviour is as expected
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: TOPIC_PAGE,
      data: {
        title: 'Topic Page Title',
        metadata: { type: 'Topic' },
      },
      brandName: 'BBC News Pidgin',
      env: 'test',
      service: 'pidgin',
      origin: 'test.bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'test.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      path: '/',
      sections: 'Pidgin, Pidgin - Topics',
      type: 'Topics',
      title: 'Topic Page Title - BBC News Pidgin',
      uid: 50924,
      useCanonical: true,
      virtualReferrer: 'test.bbc.com/previous-path',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return correct canonical config for Topic pages on live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: TOPIC_PAGE,
      data: {
        title: 'Topics Page Title',
        metadata: { type: 'Topic' },
      },
      brandName: 'BBC News Pidgin',
      chartbeatDomain: 'pidgin.bbc.co.uk',
      env: 'live',
      service: 'pidgin',
      origin: 'bbc.com',
      previousPath: '/previous-path',
    };

    const expectedConfig = {
      domain: 'pidgin.bbc.co.uk',
      idSync: {
        bbc_hid: 'foobar',
      },
      sections: 'Pidgin, Pidgin - Topics',
      title: 'Topics Page Title - BBC News Pidgin',
      type: 'Topics',
      uid: 50924,
      virtualReferrer: 'bbc.com/previous-path',
      useCanonical: true,
      path: '/',
    };

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is mostRead and env is not live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: MOST_READ_PAGE,
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
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: MOST_WATCHED_PAGE,
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
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: INDEX_PAGE,
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

    const expectedCookieValue = 'foobar';
    (jest.spyOn(Cookie, 'get') as jest.Mock).mockImplementation(
      () => expectedCookieValue,
    );

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is FIX and env is not live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: FEATURE_INDEX_PAGE,
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

    const expectedCookieValue = 'foobar';
    (jest.spyOn(Cookie, 'get') as jest.Mock).mockImplementation(
      () => expectedCookieValue,
    );

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return config for canonical pages when page type is IDX and env is not live', () => {
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: INDEX_PAGE,
      title: 'This is an index page title',
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

    const expectedCookieValue = 'foobar';
    (jest.spyOn(Cookie, 'get') as jest.Mock).mockImplementation(
      () => expectedCookieValue,
    );

    expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
  });

  it('should return null for virtualReferrer when there is no previousPath', () => {
    // @ts-expect-error testing partial data to ensure behaviour is as expected
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: FRONT_PAGE,
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

    // @ts-expect-error testing partial data to ensure behaviour is as expected
    const fixtureData: GetConfigProps = {
      isAmp: false,
      platform: 'canonical',
      pageType: FRONT_PAGE,
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
