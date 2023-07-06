import * as analyticsUtils from '#lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildPageATIParams, buildPageATIUrl } from './buildParams';

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
  statsDestination: 'statsDestination',
  id: 'validId',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'pidgin',
  lang: 'pcm',
};

const atiData = {
  atiAnalytics: {
    contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
    contentType: 'index-home',
    pageIdentifier: 'kyrgyz.page',
    pageTitle: 'pageTitle',
  },
};
// timePublished and timeUpdated are not returned via BFF implementation so set to undefined in test
const validPageURLParams = {
  appName: 'atiAnalyticsAppName',
  contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
  producerId: 'atiAnalyticsProducerId',
  contentType: 'index-home',
  pageIdentifier: 'kyrgyz.page',
  pageTitle: 'pageTitle',
  platform: 'canonical',
  statsDestination: 'statsDestination',
  service: 'pidgin',
  libraryVersion: 'simorgh',
  language: 'pcm',
  timePublished: undefined,
  timeUpdated: undefined,
};

describe('implementation of buildPageATIParams and buildPageATIUrl', () => {
  it('should return the correct object for the page given the ATI configuration', () => {
    const result = buildPageATIParams({
      atiData,
      requestContext,
      serviceContext,
    });
    expect(result).toEqual(validPageURLParams);
  });
  it('should return the correct url for a page given the ATI configuration', () => {
    const url = buildPageATIUrl({
      atiData,
      requestContext,
      serviceContext,
    });

    const parsedATIURLParams = Object.fromEntries(
      new URLSearchParams(url as string),
    );

    const expectedATIURLParams = {
      s: '598285',
      s2: 'atiAnalyticsProducerId',
      p: 'kyrgyz.page',
      r: '0x0x24x24',
      re: '1024x768',
      hl: '00-00-00',
      lng: 'en-US',
      x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
      x2: '[responsive]',
      x3: '[atiAnalyticsAppName]',
      x4: '[pcm]',
      x5: '[http%3A%2F%2Flocalhost%2F]',
      x7: '[index-home]',
      x8: '[simorgh]',
      x9: '[pageTitle]',
    };

    expect(parsedATIURLParams).toEqual(expectedATIURLParams);
  });
});
