import { buildATIUrl, buildATIClickParams } from '.';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const requestContext = {
  platform: 'platform',
  isUK: 'isUK',
  statsDestination: 'statsDestination',
  previousPath: 'http://www.example.com',
  origin: 'origin',
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
  brandName: 'brandName',
};

const article = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
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
        },
        {
          thingId: 'thing id 2',
          thingLabel: 'thing label 2',
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
const frontPage = {
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
const media = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  contentType: 'player-live',
};
const MAP = {
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
const PGL = {
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
    },
    firstPublished: 1566574729,
    lastPublished: 1566577208,
    locators: {
      curie: 'http://www.bbc.co.uk/asset/4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
    },
    passport: {},
  },
};
const idxPage = {
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

describe('ATIAnalytics params', () => {
  describe('buildATIUrl', () => {
    it('should return the right article url', () => {
      const url = buildATIUrl(
        article,
        { ...requestContext, pageType: 'article' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=service.articles.//www.bbc.co.uk.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:optimo://www.bbc.co.uk]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x6=[originhttp%253A%252F%252Fwww.example.com]&x7=[article]&x8=[simorgh]&x9=[pageTitle]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]&x13=[thing+label+1~thing+label+2]&x14=[thing+id+1~thing+id+2]&ref=originhttp%3A%2F%2Fwww.example.com',
      );
    });

    it('should return the right frontPage url', () => {
      const url = buildATIUrl(
        frontPage,
        { ...requestContext, pageType: 'frontPage' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=service.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:cps:00000000-0000-0000-0000-000000000000]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-home]&x8=[simorgh]&x9=[title+-+brandName]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]',
      );
    });

    it('should return the right IDX page url', () => {
      const url = buildATIUrl(
        idxPage,
        { ...requestContext, pageType: 'IDX' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=service.page.idxpage&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:cps:00000000-0000-0000-0000-000000000000]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-section]&x8=[simorgh]&x9=[title+-+brandName]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]',
      );
    });

    it('should return the right media url', () => {
      const url = buildATIUrl(
        media,
        { ...requestContext, pageType: 'media' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[id]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[player-live]&x8=[simorgh]&x9=[pageTitle]',
      );
    });

    it('should return the right MAP url', () => {
      const url = buildATIUrl(
        MAP,
        { ...requestContext, pageType: 'MAP' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article-media-asset]&x8=[simorgh]&x9=[headline+-+brandName]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]&x16=[WS%20-%20Inspire%20me]&x17=[News]',
      );
    });

    it('should return the right PGL url', () => {
      const url = buildATIUrl(
        PGL,
        { ...requestContext, pageType: 'PGL' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[headline+-+brandName]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]',
      );
    });

    it('should have both ref parameter and x6 referrer url parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl(
        article,
        { ...requestContext, pageType: 'article' },
        serviceContext,
      );
      const params = atiUrl.split('&');

      expect(params).toContain('x6=[originhttp%253A%252F%252Fwww.example.com]');
      expect(params).toContain('ref=originhttp%3A%2F%2Fwww.example.com');
    });

    it('should have ref parameter as the last parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl(
        article,
        { ...requestContext, pageType: 'article' },
        serviceContext,
      );
      const params = atiUrl.split('&');

      expect(params.pop()).toEqual('ref=originhttp%3A%2F%2Fwww.example.com');
    });

    it('should not have ref and x6 parameters, if referrer url does not exist', () => {
      const atiUrl = buildATIUrl(
        article,
        { ...requestContext, pageType: 'article', previousPath: '' },
        serviceContext,
      );
      const params = atiUrl.split('&');

      expect(params).not.toContain('x6=');
      expect(params).not.toContain('ref=');
    });
  });

  describe('buildATIClickParams', () => {
    it('should return the right article params', () => {
      const params = buildATIClickParams(
        article,
        { ...requestContext, pageType: 'article' },
        serviceContext,
      );
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:optimo://www.bbc.co.uk',
        contentType: 'article',
        isUK: 'isUK',
        language: 'language',
        ldpThingIds: 'thing+id+1~thing+id+2',
        ldpThingLabels: 'thing+label+1~thing+label+2',
        origin: 'origin',
        pageIdentifier: 'service.articles.//www.bbc.co.uk.page',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'platform',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
        timePublished: analyticsUtils.getPublishedDatetime(),
        timeUpdated: analyticsUtils.getPublishedDatetime(),
      });
    });

    it('should return the right frontPage params', () => {
      const params = buildATIClickParams(
        frontPage,
        { ...requestContext, pageType: 'frontPage' },
        serviceContext,
      );
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-home',
        language: 'language',
        pageIdentifier: 'service.page',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'platform',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the right IDX page params', () => {
      const params = buildATIClickParams(
        idxPage,
        { ...requestContext, pageType: 'IDX' },
        serviceContext,
      );
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-section',
        language: 'language',
        pageIdentifier: 'service.page.idxpage',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'platform',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the right media params', () => {
      const params = buildATIClickParams(
        media,
        { ...requestContext, pageType: 'media' },
        serviceContext,
      );
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'id',
        contentType: 'player-live',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'platform',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
      });
    });

    it('should return the right MAP params', () => {
      const params = buildATIClickParams(
        MAP,
        { ...requestContext, pageType: 'MAP' },
        serviceContext,
      );
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
        platform: 'platform',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the right PGL params', () => {
      const params = buildATIClickParams(
        PGL,
        { ...requestContext, pageType: 'PGL' },
        serviceContext,
      );
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
        platform: 'platform',
        producerId: 'atiAnalyticsProducerId',
        service: 'service',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });
  });
});
