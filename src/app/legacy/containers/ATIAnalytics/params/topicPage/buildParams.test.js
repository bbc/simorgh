import * as analyticsUtils from '#lib/analyticsUtils';
import { buildTopicPageATIParams, buildTopicPageATIUrl } from './buildParams';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const requestContext = {
  platform: 'platform',
  statsDestination: 'statsDestination',
  id: 'validId',
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
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
    expect(result).toMatchInlineSnapshot(
      `"s=598285&s2=atiAnalyticsProducerId&p=service.topics.validId.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Atipo%3Atopic%3AvalidId]&x2=[responsive]&x3=[atiAnalyticsAppName]&x4=[pcm]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-category]&x8=[simorgh]&x9=[pageTitle]"`,
    );
  });
});
