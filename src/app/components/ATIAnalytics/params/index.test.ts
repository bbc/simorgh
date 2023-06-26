/* eslint-disable no-console */
import * as analyticsUtils from '../../../lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
  ERROR_PAGE,
  LIVE_PAGE,
} from '../../../routes/utils/pageTypes';
import { buildATIUrl, buildATIEventTrackingParams } from '.';
import { RequestContextProps } from '../../../contexts/RequestContext';
import { ServiceConfig } from '../../../models/types/serviceConfig';
import { ATIData, PageData } from '../types';

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

// @ts-expect-error - only partial data required for testing purposes
const requestContext: RequestContextProps = {
  platform: 'canonical',
  isUK: false,
  statsDestination: 'statsDestination',
  previousPath: 'http://www.example.com',
  origin: 'origin',
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'pidgin',
  brandName: 'brandName',
  lang: 'pcm',
};

const article: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
      contentId: 'urn:bbc:optimo:asset:54321',
      nations_producer: 'scotland',
    },
    locators: {
      optimoUrn: 'http://www.bbc.co.uk',
    },
    passport: {
      language: 'language',
    },
    tags: {
      about: [
        {
          thingId: 'thing id 1',
          thingLabel: 'thing label 1',
          thingEnglishLabel: 'thing english label 1',
        },
        {
          thingId: 'thing id 2',
          thingLabel: 'thing label 2',
          thingEnglishLabel: 'thing english label 2',
        },
      ],
    },
    title: 'title',
  },
  promo: {
    headlines: {
      seoHeadline: 'pageTitle',
    },
  },
};

const frontPage: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
};

const media: PageData = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  contentType: 'player-live',
};

const MAP: PageData = {
  promo: {
    headlines: {
      headline: 'headline',
    },
  },
  metadata: {
    id: 'id',
    language: 'language',
    analyticsLabels: {
      counterName: 'pageIdentifier',
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
      contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
    },
    firstPublished: 1566574729,
    lastPublished: 1566577208,
    locators: {
      curie: 'http://www.bbc.co.uk/asset/4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
    },
    passport: {
      category: {
        categoryId:
          'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
        categoryName: 'News',
      },
      campaigns: [
        {
          campaignId: '5a988e2139461b000e9dabf7',
          campaignName: 'WS - Inspire me',
        },
      ],
    },
  },
};

const PGL: PageData = {
  promo: {
    headlines: {
      headline: 'headline',
    },
  },
  metadata: {
    id: 'id',
    language: 'language',
    analyticsLabels: {
      counterName: 'pageIdentifier',
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
      contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
    },
    firstPublished: 1566574729,
    lastPublished: 1566577208,
    locators: {
      curie: 'http://www.bbc.co.uk/asset/4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
    },
    passport: {},
  },
};

const idxPage: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page.idxpage',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
};

const homePageAnalyticsData: ATIData = {
  analytics: {
    contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
    contentType: 'index-home',
    pageIdentifier: 'kyrgyz.page',
  },
  title: 'pageTitle',
};

describe('ATIAnalytics params', () => {
  describe('buildATIUrl', () => {
    it('should return the correct article url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        data: article,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=pidgin.articles.%2F%2Fwww.bbc.co.uk.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Aoptimo%3Aasset%3A54321]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x6=[originhttp%253A%252F%252Fwww.example.com]&x7=[article]&x8=[simorgh]&x9=[pageTitle]&x10=[scotland]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[thing%2520english%2520label%25201~thing%2520english%2520label%25202]&x14=[thing%2520id%25201~thing%2520id%25202]&x17=[thing%2520english%2520label%25201~thing%2520english%2520label%25202]&ref=originhttp://www.example.com"`,
      );
    });

    it('should return the correct media article url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        data: article,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=pidgin.articles.%2F%2Fwww.bbc.co.uk.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Aoptimo%3Aasset%3A54321]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x6=[originhttp%253A%252F%252Fwww.example.com]&x7=[article-sfv]&x8=[simorgh]&x9=[pageTitle]&x10=[scotland]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[thing%2520english%2520label%25201~thing%2520english%2520label%25202]&x14=[thing%2520id%25201~thing%2520id%25202]&x17=[thing%2520english%2520label%25201~thing%2520english%2520label%25202]&ref=originhttp://www.example.com"`,
      );
    });

    it('should return the correct frontPage url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: FRONT_PAGE },
        data: frontPage,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=service.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A00000000-0000-0000-0000-000000000000]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-home]&x8=[simorgh]&x9=[title%2520-%2520brandName]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]"`,
      );
    });

    it('should return the correct IDX page url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: INDEX_PAGE },
        data: idxPage,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=service.page.idxpage&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A00000000-0000-0000-0000-000000000000]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-section]&x8=[simorgh]&x9=[title%2520-%2520brandName]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]"`,
      );
    });

    it('should return the correct media url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        data: media,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[id]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[player-live]&x8=[simorgh]&x9=[pageTitle]"`,
      );
    });

    it('should return the correct MAP url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: MEDIA_ASSET_PAGE },
        data: MAP,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A4d36f80b-8711-0b4e-8da0-ef76ae8ac470]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article-media-asset]&x8=[simorgh]&x9=[headline%2520-%2520brandName]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[WS%20-%20Inspire%20me]&x17=[News]"`,
      );
    });

    it('should return the correct PGL url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        data: PGL,
        serviceContext,
      });
      expect(url).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A4d36f80b-8711-0b4e-8da0-ef76ae8ac470]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[headline%2520-%2520brandName]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]"`,
      );
    });

    it('should return the correct Homepage url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: HOME_PAGE },
        atiData: homePageAnalyticsData,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'kyrgyz.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });

    it('should have both ref parameter and x6 referrer url parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        data: article,
        serviceContext,
      }) as string;
      const params = atiUrl.split('&');

      expect(params).toContain('x6=[originhttp%253A%252F%252Fwww.example.com]');
      expect(params).toContain('ref=originhttp://www.example.com');
    });

    it('should have ref parameter as the last parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        data: article,
        serviceContext,
      }) as string;
      const params = atiUrl.split('&');

      expect(params.pop()).toEqual('ref=originhttp://www.example.com');
    });

    it('should not have ref and x6 parameters, if referrer url does not exist', () => {
      const atiUrl = buildATIUrl({
        requestContext: {
          ...requestContext,
          pageType: ARTICLE_PAGE,
          previousPath: '',
        },
        data: article,
        serviceContext,
      }) as string;
      const params = atiUrl.split('&');

      expect(params).not.toContain('x6=');
      expect(params).not.toContain('ref=');
    });

    it.each([HOME_PAGE, ERROR_PAGE, LIVE_PAGE])(
      'should return empty object {} because %s page type is not supported',
      pageType => {
        const url = buildATIUrl({
          requestContext: { ...requestContext, pageType },
          data: {},
          serviceContext,
        });
        expect(url).toStrictEqual({});
      },
    );
  });

  describe('buildATIEventTrackingParams', () => {
    it('should return the correct article params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        data: article,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:optimo:asset:54321',
        contentType: 'article',
        categoryName: 'thing%20english%20label%201~thing%20english%20label%202',
        isUK: false,
        language: 'language',
        ldpThingIds: 'thing%20id%201~thing%20id%202',
        ldpThingLabels:
          'thing%20english%20label%201~thing%20english%20label%202',
        origin: 'origin',
        pageIdentifier: 'pidgin.articles.//www.bbc.co.uk.page',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: analyticsUtils.getPublishedDatetime(),
        timeUpdated: analyticsUtils.getPublishedDatetime(),
        nationsProducer: 'scotland',
      });
    });

    it('should return the correct media article params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        data: article,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:optimo:asset:54321',
        contentType: 'article-sfv',
        categoryName: 'thing%20english%20label%201~thing%20english%20label%202',
        isUK: false,
        language: 'language',
        ldpThingIds: 'thing%20id%201~thing%20id%202',
        ldpThingLabels:
          'thing%20english%20label%201~thing%20english%20label%202',
        origin: 'origin',
        pageIdentifier: 'pidgin.articles.//www.bbc.co.uk.page',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: analyticsUtils.getPublishedDatetime(),
        timeUpdated: analyticsUtils.getPublishedDatetime(),
        nationsProducer: 'scotland',
      });
    });

    it('should return the correct frontPage params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: FRONT_PAGE },
        data: frontPage,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-home',
        language: 'language',
        pageIdentifier: 'service.page',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct IDX page params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: INDEX_PAGE },
        data: idxPage,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-section',
        language: 'language',
        pageIdentifier: 'service.page.idxpage',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct media params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        data: media,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'id',
        contentType: 'player-live',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
      });
    });

    it('should return the correct MAP params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_ASSET_PAGE },
        data: MAP,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        categoryName: 'News',
        campaigns: [
          {
            campaignId: '5a988e2139461b000e9dabf7',
            campaignName: 'WS - Inspire me',
          },
        ],
        contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
        contentType: 'article-media-asset',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'headline - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct PGL params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        data: PGL,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        categoryName: undefined,
        campaigns: undefined,
        contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
        contentType: 'article-photo-gallery',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'headline - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct Homepage params', () => {
      const { analytics } = homePageAnalyticsData;
      const homePageATIMetadata = {
        analytics,
        title: 'pageTitle',
      };
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: HOME_PAGE },
        atiData: homePageATIMetadata,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        categoryName: undefined,
        campaigns: undefined,
        contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
        contentType: 'index-home',
        language: 'pcm',
        pageIdentifier: 'kyrgyz.page',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
      });
    });

    it.each([ERROR_PAGE, HOME_PAGE, LIVE_PAGE])(
      'should return empty object {} because %s page type is not supported',
      pageType => {
        const params = buildATIEventTrackingParams({
          requestContext: { ...requestContext, pageType },
          data: {},
          serviceContext,
        });

        expect(params).toStrictEqual({});
      },
    );

    it('should not throw exception and return empty object if no pageData is passed in', () => {
      const { error } = console;
      console.error = jest.fn();

      const pageData = null;
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        // @ts-expect-error - pass in null value to ensure error handling working as expected
        data: pageData,
        serviceContext,
      });

      expect(params).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'ATI Event Tracking Error: Could not parse tracking values from page data:',
        ),
      );
      console.error = error;
    });
  });
});
