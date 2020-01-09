import { buildATIClickParams, buildATIUrl } from '.';
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
  previousPath: 'previousPath',
  origin: 'origin',
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
  metadata: {
    id: 'id',
    language: 'language',
    analyticsLabels: {
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
    },
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
        's=598285&s2=atiAnalyticsProducerId&p=service.articles.//www.bbc.co.uk.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:optimo://www.bbc.co.uk]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http://localhost/]&x6=[originpreviousPath]&x7=[article]&x8=[simorgh]&x9=[pageTitle]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]&x13=[thing+label+1~thing+label+2]&x14=[thing+id+1~thing+id+2]',
      );
    });

    it('should return the right frontPage url', () => {
      const url = buildATIUrl(
        frontPage,
        { ...requestContext, pageType: 'frontPage' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=service.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn:bbc:cps:00000000-0000-0000-0000-000000000000]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http://localhost/]&x7=[index-home]&x8=[simorgh]&x9=[title+-+brandName]&x11=[1970-01-01T00:00:00.000Z]&x12=[1970-01-01T00:00:00.000Z]',
      );
    });

    it('should return the right media url', () => {
      const url = buildATIUrl(
        media,
        { ...requestContext, pageType: 'media' },
        serviceContext,
      );
      expect(url).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[id]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http://localhost/]&x7=[player-live]&x8=[simorgh]&x9=[pageTitle]',
      );
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
        previousPath: 'previousPath',
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
  });
});
