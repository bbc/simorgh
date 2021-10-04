import { buildArticleATIParams, buildArticleATIUrl } from './buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const requestContext = {
  platform: 'platform',
  isUK: 'isUK',
  statsDestination: 'isUK',
  previousPath: 'previousPath',
  origin: 'origin',
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:optimo://www.bbc.co.uk',
  contentType: 'article',
  language: 'language',
  pageIdentifier: 'service.articles.//www.bbc.co.uk.page',
  pageTitle: 'pageTitle',
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  service: 'service',
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  ...requestContext,
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
    it('should return the right object', () => {
      const result = buildArticleATIParams(
        article,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildArticleATIUrl', () => {
    it('should return the right url', () => {
      const result = buildArticleATIUrl(
        article,
        requestContext,
        serviceContext,
      );
      expect(result).toMatchInlineSnapshot(
        `"s=598285&s2=atiAnalyticsProducerId&p=service.articles.%2F%2Fwww.bbc.co.uk.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Aoptimo%3A%2F%2Fwww.bbc.co.uk]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http%253A%252F%252Flocalhost%252F]&x6=[originpreviousPath]&x7=[article]&x8=[simorgh]&x9=[pageTitle]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[thing%2Benglish%2Blabel%2B1~thing%2Benglish%2Blabel%2B2]&x14=[thing%2Bid%2B1~thing%2Bid%2B2]&ref=originpreviousPath"`,
      );
    });
  });
});
