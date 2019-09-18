import { buildFrontPageATIParams, buildFrontPageATIUrl } from './buildParams';
import { getPublishedDatetime } from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPageTitle,
} from '../../../../lib/analyticsUtils/frontpage';
import { buildATIPageTrackPath } from '../../atiUrl';

jest.mock('../../../../lib/analyticsUtils');
jest.mock('../../../../lib/analyticsUtils/frontpage');
jest.mock('../../atiUrl');

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

describe('buildFrontPageATIParams', () => {
  it('should return the right object', () => {
    const result = buildFrontPageATIParams({}, requestContext, serviceContext);
    expect(result).toEqual(validURLParams);
  });
});

describe('buildFrontPageATIUrl', () => {
  it('should call buildATIPageTrackPath exactly once', () => {
    const mockBuildATIPageTrackPath = jest.fn();
    buildATIPageTrackPath.mockImplementation(mockBuildATIPageTrackPath);

    buildFrontPageATIUrl({}, requestContext, serviceContext);
    expect(mockBuildATIPageTrackPath).toHaveBeenCalledTimes(1);
    expect(mockBuildATIPageTrackPath).toHaveBeenCalledWith(validURLParams);
  });
});
