import * as analyticsUtils from '#lib/analyticsUtils';
import { RequestContextProps } from '#contexts/RequestContext';
import { ServiceConfig } from '#models/types/serviceConfig';
import { buildTopicPageATIParams, buildTopicPageATIUrl } from './buildParams';

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

const topicPage = {
  title: 'pageTitle',
  contentType: 'index-category',
};

const validTopicPageURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentType: topicPage.contentType,
  pageTitle: topicPage.title,
  platform: requestContext.platform,
  statsDestination: requestContext.statsDestination,
  service: serviceContext.service,
  libraryVersion: 'simorgh',
  producerId: serviceContext.atiAnalyticsProducerId,
  language: serviceContext.lang,
  pageIdentifier: `${serviceContext.service}.topics.${requestContext.id}.page`,
  contentId: `urn:bbc:tipo:topic:${requestContext.id}`,
};

describe('implementation of buildTopicPageATIParams and buildTopicPageATIUrl', () => {
  it('should return the correct object for topic page', () => {
    const result = buildTopicPageATIParams(
      topicPage,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(validTopicPageURLParams);
  });
  it('should return the correct url for topic page', () => {
    const result = buildTopicPageATIUrl(
      topicPage,
      requestContext,
      serviceContext,
    );

    const params = Object.fromEntries(new URLSearchParams(result));

    expect(params).toEqual({
      s: '598285',
      s2: 'atiAnalyticsProducerId',
      p: 'pidgin.topics.validId.page',
      r: '0x0x24x24',
      re: '1024x768',
      hl: '00-00-00',
      lng: 'en-US',
      x1: '[urn:bbc:tipo:topic:validId]',
      x2: '[responsive]',
      x3: '[atiAnalyticsAppName]',
      x4: '[pcm]',
      x5: '[http%3A%2F%2Flocalhost%2F]',
      x7: '[index-category]',
      x8: '[simorgh]',
      x9: '[pageTitle]',
    });
  });
});
