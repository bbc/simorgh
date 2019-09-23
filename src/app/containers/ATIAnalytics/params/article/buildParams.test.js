import { buildArticleATIParams, buildArticleATIUrl } from './buildParams';
import {
  getPublishedDatetime,
  getCurrentTime,
} from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getThingAttributes,
} from '../../../../lib/analyticsUtils/article';

jest.mock('../../../../lib/analyticsUtils', () => {
  const utils = jest.requireActual('../../../../lib/analyticsUtils');

  return {
    ...utils,
    getPublishedDatetime: jest.fn(),
    getCurrentTime: jest.fn(),
  };
});
jest.mock('../../../../lib/analyticsUtils/article');

getCurrentTime.mockImplementation(() => '00:00:00');
getPublishedDatetime.mockImplementation(() => 'getPublishedDatetime');
getLanguage.mockImplementation(() => 'getLanguage');
getContentId.mockImplementation(() => 'getContentId');
getPageIdentifier.mockImplementation(() => 'getPageIdentifier');
getPromoHeadline.mockImplementation(() => 'getPromoHeadline');
getThingAttributes.mockImplementation(() => 'getThingAttributes');

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
  contentId: getContentId(),
  contentType: 'article',
  language: getLanguage(),
  ldpThingIds: getThingAttributes(),
  ldpThingLabels: getThingAttributes(),
  pageIdentifier: getPageIdentifier(),
  pageTitle: getPromoHeadline(),
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: getPublishedDatetime(),
  timeUpdated: getPublishedDatetime(),
  service: 'service',
  ...requestContext,
};

describe('buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildArticleATIParams', () => {
    it('should return the right object', () => {
      const result = buildArticleATIParams({}, requestContext, serviceContext);
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildArticleATIUrl', () => {
    it('should return the right url', () => {
      const result = buildArticleATIUrl({}, requestContext, serviceContext);
      expect(result).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=getPageIdentifier&r=0x0x24x24&re=1024x768&hl=00:00:00&lng=en-US&x1=[getContentId]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[getLanguage]&x5=[http://localhost/]&x6=[originpreviousPath]&x7=[article]&x9=[getPromoHeadline]&x11=[getPublishedDatetime]&x12=[getPublishedDatetime]&x13=[getThingAttributes]&x14=[getThingAttributes]',
      );
    });
  });
});
