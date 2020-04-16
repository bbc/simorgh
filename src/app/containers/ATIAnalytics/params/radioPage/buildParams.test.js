import { buildRadioATIParams, buildRadioATIUrl } from './buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const radio = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
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
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  platform: requestContext.platform,
  service: 'service',
};

describe('buildRadioATIParams', () => {
  it('should return the right object', () => {
    const result = buildRadioATIParams(radio, requestContext, serviceContext);
    expect(result).toEqual(validURLParams);
  });
});

describe('buildRadioATIUrl', () => {
  it('should return the right url', () => {
    const result = buildRadioATIUrl(radio, requestContext, serviceContext);
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
        'x7=[player-live]',
        'x8=[simorgh]',
        'x9=[pageTitle]',
      ].join('&'),
    );
  });
});
