import { buildMediaATIParams, buildMediaATIUrl } from './buildParams';
import {
  getPublishedDatetime,
  getCurrentTime,
} from '../../../../lib/analyticsUtils';

jest.mock('../../../../lib/analyticsUtils', () => {
  const utils = jest.requireActual('../../../../lib/analyticsUtils');

  return {
    ...utils,
    getPublishedDatetime: jest.fn(),
    getCurrentTime: jest.fn(),
  };
});

getCurrentTime.mockImplementation(() => '00-00-00');
getPublishedDatetime.mockImplementation(() => '1970-01-01T00:00:00.000Z');

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
    const result = buildMediaATIParams(media, requestContext, serviceContext);
    expect(result).toEqual(validURLParams);
  });
});

describe('buildMediaATIUrl', () => {
  it('should return the right url', () => {
    const result = buildMediaATIUrl(media, requestContext, serviceContext);
    expect(result).toEqual(
      's=598285&s2=atiAnalyticsProducerId&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[id]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[language]&x5=[http://localhost/]&x7=[player-live]&x9=[pageTitle]',
    );
  });
});
