import * as analyticsUtils from '#lib/analyticsUtils';
import { data as cpsMapData } from '#data/pidgin/cpsAssets/tori-49450859.json';
import payloadLegacy from '#data/gahuza/legacyAssets/video/2016/01/160108_australia_fire_video.json';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from './buildParams';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';

const { article: payload } = cpsMapData;

// Mocks
(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

// Fixtures
// @ts-expect-error - only partial data required for testing purposes
const requestContext: RequestContextProps = {
  platform: 'canonical',
  isUK: true,
  statsDestination: 'statsDestination',
  previousPath: 'previousPath',
  origin: 'origin',
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

// @ts-expect-error - only partial data required for testing purposes
const requestContextLegacy: RequestContextProps = {
  platform: 'canonical',
  isUK: true,
  statsDestination: 'statsDestination',
  previousPath: 'previousPath',
  origin: 'origin',
  canonicalLink:
    'https://www.bbc.com/gahuza/video/2016/01/160108_australia_fire_video',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'pidgin',
  brandName: 'Some BBC Brand',
};

// @ts-expect-error - only partial data required for testing purposes
const newsServiceContext: ServiceConfig = {
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
  service: 'pidgin',
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
  service: 'pidgin',
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
  it('should return the correct object', () => {
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

  it('should return the correct object for a legacy asset', () => {
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
    ) as string;

    const params = Object.fromEntries(new URLSearchParams(result));

    expect(params).toEqual({
      s: '598285',
      s2: 'atiAnalyticsProducerId',
      p: 'news::pidgin.news.media_asset.49450859.page',
      r: '0x0x24x24',
      re: '1024x768',
      hl: '00-00-00',
      lng: 'en-US',
      x1: '[urn:bbc:cps:curie:asset:a753e377-f11b-5646-9c9b-4775bfa4e692]',
      x2: '[responsive]',
      x3: '[atiAnalyticsAppName]',
      x4: '[pcm]',
      x5: '[http%3A%2F%2Flocalhost%2F]',
      x7: '[test-content-type]',
      x8: '[simorgh]',
      x9: '[Nigerian%20man%20Emeka%20Nelson%20don%20produce%20generator%20wey%20dey%20use%20only%20water%20-%20Some%20BBC%20Brand]',
      x11: '[1970-01-01T00:00:00.000Z]',
      x12: '[1970-01-01T00:00:00.000Z]',
      x13: '[Technology~Nigeria]',
      x14: '[31684f19-84d6-41f6-b033-7ae08098572a~3d5d5e30-dd50-4041-96d5-c970b20005b9]',
      x16: '[WS - Inspire me~WS - Educate me~WS - Keep me on trend]',
      x17: '[News]',
    });
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
