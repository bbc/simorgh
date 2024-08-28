import * as analyticsUtils from '#lib/analyticsUtils';
import { FRONT_PAGE, FEATURE_INDEX_PAGE } from '#routes/utils/pageTypes';
import { buildIndexPageATIParams, buildIndexPageATIUrl } from './buildParams';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '#models/types/serviceConfig';

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

// @ts-expect-error - only partial data required for testing purposes
const requestContext: RequestContextProps = {
  platform: 'canonical',
  isUK: false,
  statsDestination: 'statsDestination',
  previousPath: 'previousPath',
  origin: 'origin',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'news',
  brandName: 'brandName',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
  language: 'language',
  pageTitle: 'title - brandName',
  producerId: serviceContext.atiAnalyticsProducerId,
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  platform: requestContext.platform,
  service: 'news',
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

const fixPage = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page.fixpage',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
};

describe('indexPage buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Frontpage', () => {
    describe('build frontPage ATI params', () => {
      it('should return the right object', () => {
        const result = buildIndexPageATIParams(
          frontPage,
          { ...requestContext, pageType: FRONT_PAGE },
          serviceContext,
        );
        const validFrontPageURLParams = {
          ...validURLParams,
          contentType: 'index-home',
          pageIdentifier: 'service.page',
        };

        expect(result).toEqual(validFrontPageURLParams);
      });
    });

    describe('build frontPage ATI url', () => {
      it('should return the right url', () => {
        const result = buildIndexPageATIUrl(
          frontPage,
          { ...requestContext, pageType: FRONT_PAGE },
          serviceContext,
        ) as string;

        const params = Object.fromEntries(new URLSearchParams(result));

        expect(params).toEqual({
          s: '598285',
          s2: 'atiAnalyticsProducerId',
          p: 'service.page',
          r: '0x0x24x24',
          re: '1024x768',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:cps:00000000-0000-0000-0000-000000000000]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[language]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x7: '[index-home]',
          x8: '[simorgh]',
          x9: '[title%20-%20brandName]',
          x11: '[1970-01-01T00:00:00.000Z]',
          x12: '[1970-01-01T00:00:00.000Z]',
        });
      });
    });
  });

  describe('FIX Page', () => {
    describe('build FIX Page ATI params', () => {
      it('should return the right object', () => {
        const result = buildIndexPageATIParams(
          fixPage,
          { ...requestContext, pageType: FEATURE_INDEX_PAGE },
          serviceContext,
        );
        const validIdxPageURLParams = {
          ...validURLParams,
          contentType: 'index-section',
          pageIdentifier: 'service.page.fixpage',
        };

        expect(result).toEqual(validIdxPageURLParams);
      });
    });

    describe('build FIX Page ATI url', () => {
      it('should return the right url', () => {
        const result = buildIndexPageATIUrl(
          fixPage,
          { ...requestContext, pageType: FEATURE_INDEX_PAGE },
          serviceContext,
        ) as string;

        const params = Object.fromEntries(new URLSearchParams(result));

        expect(params).toEqual({
          s: '598285',
          s2: 'atiAnalyticsProducerId',
          p: 'service.page.fixpage',
          r: '0x0x24x24',
          re: '1024x768',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:cps:00000000-0000-0000-0000-000000000000]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[language]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x7: '[index-section]',
          x8: '[simorgh]',
          x9: '[title%20-%20brandName]',
          x11: '[1970-01-01T00:00:00.000Z]',
          x12: '[1970-01-01T00:00:00.000Z]',
        });
      });
    });
  });
});
