import { buildArticleATIParams, buildArticleATIUrl } from './buildParams';
import { getPublishedDatetime } from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getThingAttributes,
} from '../../../../lib/analyticsUtils/article';
import { buildATIPageTrackPath } from '../../atiUrl';

jest.mock('../../../../lib/analyticsUtils');
jest.mock('../../../../lib/analyticsUtils/article');
jest.mock('../../atiUrl');

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
    it('should call buildATIPageTrackPath exactly once', () => {
      const mockBuildATIPageTrackPath = jest.fn();
      buildATIPageTrackPath.mockImplementation(mockBuildATIPageTrackPath);

      buildArticleATIUrl({}, requestContext, serviceContext);
      expect(mockBuildATIPageTrackPath).toHaveBeenCalledTimes(1);
      expect(mockBuildATIPageTrackPath).toHaveBeenCalledWith(validURLParams);
    });

    it('should call article utility functions with arguments', () => {
      const mockArticleData = {};
      const mockServiceContext = {
        ...serviceContext,
        service: 'news',
      };
      buildArticleATIUrl({}, requestContext, mockServiceContext);

      expect(getContentId).toHaveBeenCalledTimes(1);
      expect(getContentId).toHaveBeenCalledWith(mockArticleData);
      expect(getLanguage).toHaveBeenCalledTimes(1);
      expect(getLanguage).toHaveBeenCalledWith(mockArticleData);
      expect(getThingAttributes).toHaveBeenCalledTimes(2);
      expect(getThingAttributes).toHaveBeenCalledWith(
        'thingId',
        mockArticleData,
      );
      expect(getThingAttributes).toHaveBeenCalledWith(
        'thingLabel',
        mockArticleData,
      );
      expect(getPageIdentifier).toHaveBeenCalledTimes(1);
      expect(getPageIdentifier).toHaveBeenCalledWith('news', mockArticleData);
      expect(getPromoHeadline).toHaveBeenCalledTimes(1);
      expect(getPromoHeadline).toHaveBeenCalledWith(mockArticleData);
      expect(getPublishedDatetime).toHaveBeenCalledTimes(2);
      expect(getPublishedDatetime).toHaveBeenCalledWith(
        'firstPublished',
        mockArticleData,
      );
      expect(getPublishedDatetime).toHaveBeenCalledWith(
        'lastPublished',
        mockArticleData,
      );
    });
  });
});
