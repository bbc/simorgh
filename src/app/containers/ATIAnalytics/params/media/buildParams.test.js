import { buildMediaATIParams, buildMediaATIUrl } from './buildParams';
import { buildATIPageTrackPath } from '../../atiUrl';

jest.mock('../../../../lib/analyticsUtils');
jest.mock('../../atiUrl');

const pageData = {
  metadata: {
    id: 'id',
    language: 'language',
    analyticsLabels: {
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
    },
  },
};

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
  contentId: 'id',
  contentType: 'player-live',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  producerId: serviceContext.atiAnalyticsProducerId,
  statsDestination: requestContext.statsDestination,
  platform: requestContext.platform,
  service: 'service',
};

describe('buildMediaATIParams', () => {
  it('should return the right object', () => {
    const result = buildMediaATIParams(
      pageData,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(validURLParams);
  });
});

describe('buildMediaATIUrl', () => {
  it('should call buildATIPageTrackPath exactly once', () => {
    const mockBuildATIPageTrackPath = jest.fn();
    buildATIPageTrackPath.mockImplementation(mockBuildATIPageTrackPath);

    buildMediaATIUrl(pageData, requestContext, serviceContext);
    expect(mockBuildATIPageTrackPath).toHaveBeenCalledTimes(1);
    expect(mockBuildATIPageTrackPath).toHaveBeenCalledWith(validURLParams);
  });
});
