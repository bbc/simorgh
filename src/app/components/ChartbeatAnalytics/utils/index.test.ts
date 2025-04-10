import Cookie from 'js-cookie';
import onClient from '../../../lib/utilities/onClient';
import {
  ARTICLE_PAGE,
  MOST_READ_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  TOPIC_PAGE,
  MEDIA_ARTICLE_PAGE,
  LIVE_PAGE,
  LIVE_RADIO_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
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

jest.mock('#lib/utilities/onClient', () =>
  jest.fn().mockImplementation(() => true),
);

const mockWindowObj = {
  location: {
    pathname: '/',
  },
} as Window & typeof globalThis;

jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

describe('Chartbeat utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });

  describe('Chartbeat ID Cookie', () => {
    it('should return null when onClient is false', () => {
      (onClient as jest.Mock).mockReturnValueOnce(false);
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return null when ID cookie does not exist', () => {
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return the contents of the ID cookie when a value is present', () => {
      const expectedCookieValue = 'foobar';
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
        pageType: MEDIA_ASSET_PAGE,
        expectedDefaultType: 'article-media-asset',
        expectedShortType: 'article-media-asset',
      },
      {
        pageType: AUDIO_PAGE,
        expectedDefaultType: 'Radio',
        expectedShortType: 'Radio',
      },
      {
        pageType: TV_PAGE,
        expectedDefaultType: 'TV',
        expectedShortType: 'TV',
      },
      {
        pageType: MOST_READ_PAGE,
        expectedDefaultType: 'Most Read',
        expectedShortType: 'Most Read',
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
        pageType: LIVE_PAGE,
        expectedDefaultType: 'Live',
        expectedShortType: 'LIV',
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
    pageType: PageTypes;
    sectionName?: string;
    categoryName?: string;
    mediaPageType?: string;
    producer?: string | null;
    chapter?: string | null;
    description: string;
    expected: string;
  }

  describe('Chartbeat Sections', () => {
    const sectionFixtures: SectionFixtures[] = [
      {
        service: 'news',
        producer: 'wales',
        chapter: 'election 2017',
        pageType: ARTICLE_PAGE,
        description: 'should add chapter and producer to article type',
        expected:
          'News, News - ART, News - wales, News - wales - ART, News - election 2017, News - election 2017 - ART',
      },
      {
        service: 'persian',
        producer: null,
        chapter: null,
        pageType: ARTICLE_PAGE,
        description: 'should not add chapter and producer when not present',
        expected: 'Persian, Persian - ART',
      },
      {
        service: 'news',
        producer: 'foo',
        chapter: null,
        pageType: ARTICLE_PAGE,
        description: 'should not add chapter when not present',
        expected: 'News, News - ART, News - foo, News - foo - ART',
      },
      {
        service: 'news',
        producer: null,
        chapter: 'bar',
        pageType: ARTICLE_PAGE,
        description: 'should not add producer when not present',
        expected: 'News, News - ART, News - bar, News - bar - ART',
      },
      {
        service: 'news',
        producer: 'news',
        chapter: 'baz',
        pageType: ARTICLE_PAGE,
        description: 'should not add producer when producer == service',
        expected: 'News, News - ART, News - baz, News - baz - ART',
      },
      {
        service: 'afrique',
        sectionName: 'Media',
        categoryName: 'News',
        pageType: MEDIA_ASSET_PAGE,
        description: 'should add section and category to MAPs',
        expected:
          'Afrique, Afrique - Media, Afrique - MAP, Afrique - Media - MAP, Afrique - News-category',
      },
      {
        service: 'korean',
        pageType: LIVE_RADIO_PAGE,
        description: 'should return expected section for live radio',
        mediaPageType: 'Radio',
        expected: 'Korean, Korean - Radio',
      },
      {
        service: 'indonesia',
        pageType: AUDIO_PAGE,
        description: 'should return expected section for onDemand radio',
        mediaPageType: 'Radio',
        expected: 'Indonesia, Indonesia - Radio',
      },
      {
        service: 'pashto',
        pageType: TV_PAGE,
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
      {
        service: 'mundo',
        pageType: LIVE_PAGE,
        description: 'should return expected section for live page',
        expected: 'Mundo, Mundo - LIV',
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
        producer,
        chapter,
      }) => {
        it(description, () => {
          expect(
            buildSections({
              service,
              pageType,
              // @ts-expect-error allows testing of null producer
              producer,
              // @ts-expect-error allows testing of null chapter
              chapter,
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
    test.each`
      pageType          | title                     | brandName            | expected
      ${MOST_READ_PAGE} | ${'Most Read Page Title'} | ${'BBC News Pidgin'} | ${'Most Read Page Title - BBC News Pidgin'}
      ${TOPIC_PAGE}     | ${'Topic Page Title'}     | ${'BBC News Pidgin'} | ${'Topic Page Title - BBC News Pidgin'}
      ${LIVE_PAGE}      | ${'Live Page Title'}      | ${'BBC News Pidgin'} | ${'Live Page Title - BBC News Pidgin'}
      ${AUDIO_PAGE}     | ${'Audio Page Title'}     | ${'BBC News Pidgin'} | ${'Audio Page Title - BBC News Pidgin'}
      ${TV_PAGE}        | ${'TV Page Title'}        | ${'BBC News Pidgin'} | ${'TV Page Title - BBC News Pidgin'}
    `(
      'should return correct title when pageType is $pageType and brandName is $brandName',
      ({ pageType, title, brandName, expected }) => {
        expect(getTitle({ pageType, brandName, title })).toBe(expected);
      },
    );

    test.each`
      pageType              | title                         | expected
      ${PHOTO_GALLERY_PAGE} | ${'PGL Page Title'}           | ${'PGL Page Title'}
      ${STORY_PAGE}         | ${'STY Page Title'}           | ${'STY Page Title'}
      ${MEDIA_ASSET_PAGE}   | ${'MAP Page Title'}           | ${'MAP Page Title'}
      ${ARTICLE_PAGE}       | ${'Article Page Title'}       | ${'Article Page Title'}
      ${MEDIA_ARTICLE_PAGE} | ${'Media Article Page Title'} | ${'Media Article Page Title'}
      ${'unknown'}          | ${'Unknown Page Title'}       | ${'Unknown Page Title'}
    `(
      'should return correct title when pageType is $pageType',
      ({ pageType, title, expected }) => {
        expect(getTitle({ pageType, title })).toBe(expected);
      },
    );
  });

  describe('Chartbeat Config', () => {
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
        contentType: 'New Article',
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
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for amp pages when page type is media (live radio) and env is not live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: true,
        platform: 'amp',
        pageType: LIVE_RADIO_PAGE,
        mediaPageType: 'Radio',
        contentType: 'player-live',
        title: 'Live Radio Page Title',
        brandName: 'BBC News Korean',
        chartbeatDomain: 'korean.bbc.co.uk',
        env: 'test',
        service: 'korean',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'Korean, Korean - Radio',
        title: 'Live Radio Page Title - BBC News Korean',
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
        brandName: 'BBC News Mundo',
        title: 'STY Page Title',
        sectionName: STORY_PAGE,
        categoryName: 'mundo',
        chartbeatDomain: 'mundo.bbc.co.uk',
        env: 'live',
        service: 'mundo',
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
        sectionName: STORY_PAGE,
        title: 'STY Page Title',
        categoryName: 'mundo',
        brandName: 'BBC News Mundo',
        chartbeatDomain: 'mundo.bbc.co.uk',
        env: 'test',
        service: 'mundo',
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
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    describe('Chartbeat Media Article Page - article-sfv', () => {
      it("should have 'video' in its identifier when the primary media type is video", () => {
        // @ts-expect-error testing partial data to ensure behaviour is as expected
        const fixtureData: GetConfigProps = {
          pageType: MEDIA_ARTICLE_PAGE,
          taggings: [
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
              value:
                'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
            },
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
              value:
                'http://www.bbc.co.uk/things/ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f#id',
            },
          ],
          service: 'pidgin',
          title: 'Media Article with video Page title',
        };

        const expectedConfig = {
          domain: 'test.bbc.co.uk',
          idSync: {
            bbc_hid: 'foobar',
          },
          path: '/',
          sections: 'Pidgin, Pidgin - video',
          title: 'Media Article with video Page title',
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
          taggings: [
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
              value:
                'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
            },
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
              value:
                'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
            },
          ],
          service: 'pidgin',
          title: 'Media Article with audio page title',
        };

        const expectedConfig = {
          domain: 'test.bbc.co.uk',
          idSync: {
            bbc_hid: 'foobar',
          },
          path: '/',
          sections: 'Pidgin, Pidgin - audio',
          title: 'Media Article with audio page title',
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
          service: 'pidgin',
          title: 'Media article page with no taggings',
        };

        const expectedConfig = {
          domain: 'test.bbc.co.uk',
          idSync: {
            bbc_hid: 'foobar',
          },
          path: '/',
          sections: 'Pidgin, Pidgin - article-sfv',
          title: 'Media article page with no taggings',
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
          taggings: [
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
              value:
                'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
            },
            {
              predicate: 'http://www.bbc.co.uk/ontologies/bbc/SOME_OTHER_TAG',
              value:
                'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
            },
          ],
          service: 'pidgin',
          title: 'Media Article page with unknown taggings',
        };

        const expectedConfig = {
          domain: 'test.bbc.co.uk',
          idSync: {
            bbc_hid: 'foobar',
          },
          path: '/',
          sections: 'Pidgin, Pidgin - article-sfv',
          title: 'Media Article page with unknown taggings',
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
          service: 'pidgin',
          title: 'This is an article title',
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

    it('should return config for canonical pages when page type is media (onDemand TV) and env is live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: TV_PAGE,
        mediaPageType: 'TV',
        brandName: 'BBC News Pashto',
        chartbeatDomain: 'pashto.bbc.co.uk',
        contentType: 'player-episode',
        env: 'live',
        service: 'pashto',
        title: 'OnDemand TV Page Title',
      };

      const expectedConfig = {
        domain: 'pashto.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'Pashto, Pashto - TV',
        title: 'OnDemand TV Page Title - BBC News Pashto',
        type: 'player-episode',
        uid: 50924,
        virtualReferrer: null,
        useCanonical: true,
        path: '/',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for canonical pages when page type is podcast and env is live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: AUDIO_PAGE,
        mediaPageType: 'Podcasts',
        brandName: 'BBC News Arabic',
        chartbeatDomain: 'arabic.bbc.co.uk',
        contentType: 'player-episode',
        env: 'live',
        service: 'arabic',
        title: 'Podcast Page Title',
      };

      const expectedConfig = {
        domain: 'arabic.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'Arabic, Arabic - Podcasts',
        title: 'Podcast Page Title - BBC News Arabic',
        type: 'player-episode',
        uid: 50924,
        virtualReferrer: null,
        useCanonical: true,
        path: '/',
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return config for canonical pages when page type is for onDemandAudio and env is live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: AUDIO_PAGE,
        mediaPageType: 'Radio',
        brandName: 'BBC News Arabic',
        chartbeatDomain: 'arabic.bbc.co.uk',
        contentType: 'player-episode',
        env: 'live',
        service: 'arabic',
        title: 'Audio Page Title',
      };

      const expectedConfig = {
        domain: 'arabic.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        sections: 'Arabic, Arabic - Radio',
        title: 'Audio Page Title - BBC News Arabic',
        type: 'player-episode',
        uid: 50924,
        virtualReferrer: null,
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
        title: 'Topics Page Title',
        brandName: 'BBC News Pidgin',
        env: 'test',
        service: 'pidgin',
      };

      const expectedConfig = {
        domain: 'test.bbc.co.uk',
        idSync: {
          bbc_hid: 'foobar',
        },
        path: '/',
        sections: 'Pidgin, Pidgin - Topics',
        type: 'Topics',
        title: 'Topics Page Title - BBC News Pidgin',
        uid: 50924,
        useCanonical: true,
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return correct canonical config for Topic pages on live', () => {
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: TOPIC_PAGE,
        title: 'Topics Page Title',
        brandName: 'BBC News Pidgin',
        chartbeatDomain: 'pidgin.bbc.co.uk',
        env: 'live',
        service: 'pidgin',
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
        virtualReferrer: null,
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
        title: 'TOP 뉴스',
        brandName: 'BBC News 코리아',
        chartbeatDomain: 'korean.bbc.co.uk',
        env: 'test',
        service: 'korean',
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
        virtualReferrer: null,
      };

      expect(getConfig(fixtureData)).toStrictEqual(expectedConfig);
    });

    it('should return null for virtualReferrer when platform is not AMP', () => {
      // @ts-expect-error testing partial data to ensure behaviour is as expected
      const fixtureData: GetConfigProps = {
        isAmp: false,
        platform: 'canonical',
        pageType: ARTICLE_PAGE,
        brandName: 'BBC-News',
        chartbeatDomain: 'bbc.co.uk',
        env: 'test',
        service: 'news',
      };

      const chartbeatConfig = getConfig(fixtureData);
      expect(chartbeatConfig.virtualReferrer).toBeNull();
    });
  });
});
