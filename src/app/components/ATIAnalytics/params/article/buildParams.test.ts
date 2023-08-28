import * as analyticsUtils from '#lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { PageData } from '../../types';
import { buildArticleATIParams, buildArticleATIUrl } from './buildParams';

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
  statsDestination: 'isUK',
  previousPath: 'previousPath',
  origin: 'origin',
  service: 'news',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'news',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:optimo:asset://www.bbc.co.uk',
  contentType: 'article',
  language: 'language',
  ldpThingIds: 'thing%20id%201~thing%20id%202',
  ldpThingLabels: 'thing%20english%20label%201~thing%20english%20label%202',
  pageIdentifier: 'news.articles.//www.bbc.co.uk.page',
  pageTitle: 'pageTitle',
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  categoryName: 'thing%20english%20label%201~thing%20english%20label%202',
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  nationsProducer: 'scotland',
  ...requestContext,
};

const article: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
      contentId: 'urn:bbc:optimo:asset://www.bbc.co.uk',
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

describe('buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildArticleATIParams', () => {
    it('should return the right article object when no pageType is specified', () => {
      const result = buildArticleATIParams(
        article,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  it('should return the right article object when an article pageType is specified', () => {
    const result = buildArticleATIParams(
      article,
      requestContext,
      serviceContext,
      'article',
    );
    expect(result).toEqual({ ...validURLParams, contentType: 'article' });
  });

  it('should return the right media-article object when a mediaArticle pageType is specified', () => {
    const result = buildArticleATIParams(
      article,
      requestContext,
      serviceContext,
      'article-sfv',
    );
    expect(result).toEqual({
      ...validURLParams,
      contentType: 'article-sfv',
    });
  });

  describe('buildArticleATIUrl', () => {
    it('should return the right url', () => {
      const result = buildArticleATIUrl(
        article,
        requestContext,
        serviceContext,
      ) as string;

      const atiParams = Object.fromEntries(new URLSearchParams(result));

      expect(atiParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'news.articles.//www.bbc.co.uk.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:asset://www.bbc.co.uk]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[language]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[originpreviousPath]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
        x10: '[scotland]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
        x13: '[thing%20english%20label%201~thing%20english%20label%202]',
        x14: '[thing%20id%201~thing%20id%202]',
        x17: '[thing%20english%20label%201~thing%20english%20label%202]',
        ref: 'originpreviousPath',
      });
    });
  });
});
