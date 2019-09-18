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
});
