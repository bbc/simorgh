import { buildFrontPageATIParams, buildFrontPageATIUrl } from './buildParams';
import {
  getPublishedDatetime,
  getCurrentTime,
} from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPageTitle,
} from '../../../../lib/analyticsUtils/frontpage';

jest.mock('../../../../lib/analyticsUtils', () => {
  const utils = jest.requireActual('../../../../lib/analyticsUtils');

  return {
    ...utils,
    getPublishedDatetime: jest.fn(),
    getCurrentTime: jest.fn(),
  };
});
jest.mock('../../../../lib/analyticsUtils/frontpage');

getCurrentTime.mockImplementation(() => '00:00:00');
getPublishedDatetime.mockImplementation(() => 'getPublishedDatetime');
getLanguage.mockImplementation(() => 'getLanguage');
getContentId.mockImplementation(() => 'getContentId');
getPageIdentifier.mockImplementation(() => 'getPageIdentifier');
getPageTitle.mockImplementation(() => 'getPageTitle');

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

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: getContentId(),
  contentType: 'index-home',
  language: getLanguage(),
  pageIdentifier: getPageIdentifier(),
  pageTitle: getPageTitle(),
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: getPublishedDatetime(),
  timeUpdated: getPublishedDatetime(),
  platform: requestContext.platform,
  service: 'service',
  statsDestination: requestContext.statsDestination,
};

describe('frontpage buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildFrontPageATIParams', () => {
    it('should return the right object', () => {
      const result = buildFrontPageATIParams(
        {},
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildFrontPageATIUrl', () => {
    it('should return the right url', () => {
      const result = buildFrontPageATIUrl({}, requestContext, serviceContext);
      expect(result).toEqual(
        's=598285&s2=atiAnalyticsProducerId&p=getPageIdentifier&r=0x0x24x24&re=1024x768&hl=00:00:00&lng=en-US&x1=[getContentId]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[getLanguage]&x5=[http://localhost/]&x7=[index-home]&x9=[getPageTitle]&x11=[getPublishedDatetime]&x12=[getPublishedDatetime]',
      );
    });
  });
});
