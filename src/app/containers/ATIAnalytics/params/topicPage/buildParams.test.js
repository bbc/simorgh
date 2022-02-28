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
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
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
};

describe('buildTopicPageATIParams', () => {
  it('should return the correct object for topic page', () => {
    const result = buildTopicPageATIParams(
      topicPage,
      requestContext,
      serviceContext,
    );
    expect(result).toEqual(validTopicPageURLParams);
  });
});

describe('buildTopicPageATIUrl', () => {
  it('should return the correct url for topic page', () => {
    const result = buildTopicPageATIUrl(
      topicPage,
      requestContext,
      serviceContext,
    );
    expect(result).toMatchInlineSnapshot(
      `"s=598285&s2=atiAnalyticsProducerId&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x2=[responsive]&x3=[atiAnalyticsAppName]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-category]&x8=[simorgh]&x9=[pageTitle]"`,
    );
  });
});
