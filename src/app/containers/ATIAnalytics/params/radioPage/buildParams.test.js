import { buildRadioATIParams, buildRadioATIUrl } from './buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const liveRadio = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  contentType: 'player-live',
};

const onDemandRadio = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  contentType: 'player-episode',
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

const validLiveRadioURLParams = {
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

const validOnDemandURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:pips:id',
  contentType: 'player-episode',
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
  it('should return the correct object for live radio', () => {
    const result = buildRadioATIParams(
      liveRadio,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(validLiveRadioURLParams);
  });

  it('should return the correct object for onDemand radio', () => {
    const result = buildRadioATIParams(
      onDemandRadio,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(validOnDemandURLParams);
  });
});

describe('buildRadioATIUrl', () => {
  it('should return the correct url for live radio', () => {
    const result = buildRadioATIUrl(liveRadio, requestContext, serviceContext);
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
        'x5=[http%3A%2F%2Flocalhost%2F]',
        'x7=[player-live]',
        'x8=[simorgh]',
        'x9=[pageTitle]',
      ].join('&'),
    );
  });

  it('should return the correct url for onDemand radio', () => {
    const result = buildRadioATIUrl(
      onDemandRadio,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(
      [
        's=598285',
        's2=atiAnalyticsProducerId',
        'p=pageIdentifier',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:pips:id]',
        'x2=[responsive]',
        'x3=[atiAnalyticsAppName]',
        'x4=[language]',
        'x5=[http%3A%2F%2Flocalhost%2F]',
        'x7=[player-episode]',
        'x8=[simorgh]',
        'x9=[pageTitle]',
      ].join('&'),
    );
  });
});
