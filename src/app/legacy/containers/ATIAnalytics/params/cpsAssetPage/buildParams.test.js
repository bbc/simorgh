import * as analyticsUtils from '#lib/analyticsUtils';
import payload from '#data/pidgin/cpsAssets/tori-49450859.json';
import payloadLegacy from '#data/gahuza/legacyAssets/video/2016/01/160108_australia_fire_video.json';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from './buildParams';

// Mocks
analyticsUtils.getAtUserId = jest.fn();
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
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

const requestContextLegacy = {
  platform: 'platform',
  isUK: 'isUK',
  statsDestination: 'statsDestination',
  previousPath: 'previousPath',
  origin: 'origin',
  canonicalLink:
    'https://www.bbc.com/gahuza/video/2016/01/160108_australia_fire_video',
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
  brandName: 'Some BBC Brand',
};

const newsServiceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'news',
  brandName: 'Some BBC Brand',
};

const expectation = {
  appName: serviceContext.atiAnalyticsAppName,
  categoryName: 'News',
  campaigns: payload.metadata.passport.campaigns,
  contentId: 'urn:bbc:cps:curie:asset:a753e377-f11b-5646-9c9b-4775bfa4e692',
  contentType: 'test-content-type',
  language: payload.metadata.language,
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  pageIdentifier: `news::${payload.metadata.analyticsLabels.counterName}`,
  pageTitle: `${payload.promo.headlines.headline} - ${serviceContext.brandName}`,
  platform: requestContext.platform,
  producerId: serviceContext.atiAnalyticsProducerId,
  statsDestination: requestContext.statsDestination,
  service: 'service',
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  ldpThingLabels: 'Technology~Nigeria',
  ldpThingIds:
    '31684f19-84d6-41f6-b033-7ae08098572a~3d5d5e30-dd50-4041-96d5-c970b20005b9',
};

const expectationLegacy = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:cps:curie:asset:a753e377-f11b-5646-9c9b-4775bfa4e692',
  contentType: 'test-content-type',
  language: payloadLegacy.metadata.language,
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  pageTitle: `${payloadLegacy.promo.headlines.headline} - ${serviceContext.brandName}`,
  platform: requestContextLegacy.platform,
  producerId: serviceContext.atiAnalyticsProducerId,
  statsDestination: requestContextLegacy.statsDestination,
  service: 'service',
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
};

const newsExpectation = {
  appName: serviceContext.atiAnalyticsAppName,
  categoryName: 'News',
  campaigns: payload.metadata.passport.campaigns,
  contentId: 'urn:bbc:cps:curie:asset:a753e377-f11b-5646-9c9b-4775bfa4e692',
  contentType: 'test-content-type',
  language: payload.metadata.language,
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  pageIdentifier: `overrideAtiChapter::${payload.metadata.analyticsLabels.counterName}`,
  pageTitle: `${payload.promo.headlines.headline} - ${serviceContext.brandName}`,
  platform: requestContext.platform,
  producerId: 'overrideProducerId',
  statsDestination: requestContext.statsDestination,
  service: 'news',
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  ldpThingLabels: 'Technology~Nigeria',
  ldpThingIds:
    '31684f19-84d6-41f6-b033-7ae08098572a~3d5d5e30-dd50-4041-96d5-c970b20005b9',
};

describe('buildCpsAssetPageATIParams', () => {
  it('should return the right object', () => {
    const result = buildCpsAssetPageATIParams(
      payload,
      requestContext,
      serviceContext,
      'test-content-type',
    );
    expect(result).toEqual(expectation);
  });

  it('should handle invalid counter name', () => {
    const payloadInvalidCounterName = {
      ...payload,
      metadata: {
        ...payload.metadata,
        analyticsLabels: {
          ...payload.metadata.analyticsLabels,
          counterName: 'invalid',
        },
      },
    };
    const result = buildCpsAssetPageATIParams(
      payloadInvalidCounterName,
      requestContext,
      serviceContext,
      'test-content-type',
    );
    expect(result).toEqual({ ...expectation, pageIdentifier: 'invalid' });
  });

  it('should return the right object', () => {
    const result = buildCpsAssetPageATIParams(
      payloadLegacy,
      requestContextLegacy,
      serviceContext,
      'test-content-type',
    );
    expect(result).toEqual(expectationLegacy);
  });
});

describe('buildCpsAssetPageATIUrl', () => {
  it('should return the right url', () => {
    const result = buildCpsAssetPageATIUrl(
      payload,
      requestContext,
      serviceContext,
      'test-content-type',
    );

    expect(result).toMatchInlineSnapshot(
      `"s=598285&s2=atiAnalyticsProducerId&p=news%3A%3Apidgin.news.media_asset.49450859.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Aa753e377-f11b-5646-9c9b-4775bfa4e692]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[pcm]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[test-content-type]&x8=[simorgh]&x9=[Nigerian%2520man%2520Emeka%2520Nelson%2520don%2520produce%2520generator%2520wey%2520dey%2520use%2520only%2520water%2520-%2520Some%2520BBC%2520Brand]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Technology~Nigeria]&x14=[31684f19-84d6-41f6-b033-7ae08098572a~3d5d5e30-dd50-4041-96d5-c970b20005b9]&x16=[WS%20-%20Inspire%20me~WS%20-%20Educate%20me~WS%20-%20Keep%20me%20on%20trend]&x17=[News]"`,
    );
  });
});

describe('getProducer', () => {
  it('should return the right producer for a news asset', () => {
    const result = buildCpsAssetPageATIParams(
      payload,
      requestContext,
      newsServiceContext,
      'test-content-type',
    );
    expect(result).toEqual(newsExpectation);
  });
});
