import { buildFrontPageATIParams, buildFrontPageATIUrl } from './buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

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
  brandName: 'brandName',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
  contentType: 'index-home',
  language: 'language',
  pageIdentifier: 'service.page',
  pageTitle: 'title - brandName',
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  platform: requestContext.platform,
  service: 'service',
  statsDestination: requestContext.statsDestination,
};

const frontPage = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
};

describe('frontpage buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildFrontPageATIParams', () => {
    it('should return the right object', () => {
      const result = buildFrontPageATIParams(
        frontPage,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildFrontPageATIUrl', () => {
    it('should return the right url', () => {
      const result = buildFrontPageATIUrl(
        frontPage,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(
        [
          's=598285',
          's2=atiAnalyticsProducerId',
          'p=service.page',
          'r=0x0x24x24',
          're=1024x768',
          'hl=00-00-00',
          'lng=en-US',
          'x1=[urn:bbc:cps:00000000-0000-0000-0000-000000000000]',
          'x2=[responsive]',
          'x3=[atiAnalyticsAppName]',
          'x4=[language]',
          'x5=[http%3A%2F%2Flocalhost%2F]',
          'x7=[index-home]',
          'x8=[simorgh]',
          'x9=[title+-+brandName]',
          'x11=[1970-01-01T00:00:00.000Z]',
          'x12=[1970-01-01T00:00:00.000Z]',
        ].join('&'),
      );
    });
  });
});
