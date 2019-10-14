import { buildCPSATIParams, buildCPSATIUrl } from './buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';
import payload from '#data/pidgin/cpsAssets/tori-49450859.json';

// Mocks
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

// Fixtures
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

const expectation = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'id',
  contentType: 'article-media-asset',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  producerId: serviceContext.atiAnalyticsProducerId,
  statsDestination: requestContext.statsDestination,
  platform: requestContext.platform,
  service: 'service',
};

describe('buildRadioATIParams', () => {
  it('should return the right object', () => {
    const result = buildCPSATIParams(payload, requestContext, serviceContext);
    expect(result).toEqual(expectation);
  });
});

describe('buildRadioATIUrl', () => {
  it('should return the right url', () => {
    const result = buildCPSATIUrl(payload, requestContext, serviceContext);
    expect(result).toEqual(
      [
        's=598285',
        's2=atiAnalyticsProducerId',
        'p=pageIdentifier',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[id]',
        'x2=[responsive]',
        'x3=[atiAnalyticsAppName]',
        'x4=[language]',
        'x5=[http://localhost/]',
        'x7=[article-media-asset]',
        'x9=[pageTitle]',
      ].join('&'),
    );
  });
});
