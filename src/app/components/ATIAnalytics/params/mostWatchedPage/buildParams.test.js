import * as analyticsUtils from '#lib/analyticsUtils';
import {
  buildMostWatchedATIParams,
  buildMostWatchedATIUrl,
} from './buildParams';

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
  atiAnalyticsAppName: 'news-pidgin',
  atiAnalyticsProducerId: '70',
  service: 'pidgin',
  brandName: 'BBC News Pidgin',
  mostWatched: { header: 'De one we dem don look' },
  lang: 'pcm',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentType: 'list-datadriven',
  language: 'pcm',
  pageIdentifier: 'pidgin.media.video.page',
  pageTitle: 'De one we dem don look - BBC News Pidgin',
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  producerId: serviceContext.atiAnalyticsProducerId,
  platform: requestContext.platform,
  service: 'pidgin',
  statsDestination: requestContext.statsDestination,
  timePublished: '2019-11-06T15:00:00Z',
  timeUpdated: '2030-01-01T17:00:00Z',
};

const pageData = {
  firstRecordTimeStamp: '2019-11-06T15:00:00Z',
  lastRecordTimeStamp: '2030-01-01T17:00:00Z',
};

describe('mostWatched buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildMostWatchedATIParams', () => {
    it('should return the right object', () => {
      const result = buildMostWatchedATIParams(
        pageData,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildMostWatchedATIUrl', () => {
    it('should return the right url', () => {
      const result = buildMostWatchedATIUrl(
        pageData,
        requestContext,
        serviceContext,
      );
      expect(result).toMatchInlineSnapshot(
        `"s=598285&s2=70&p=pidgin.media.video.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x2=[responsive]&x3=[news-pidgin]&x4=[pcm]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[list-datadriven]&x8=[simorgh]&x9=[De%2520one%2520we%2520dem%2520don%2520look%2520-%2520BBC%2520News%2520Pidgin]&x11=[2019-11-06T15%3A00%3A00Z]&x12=[2030-01-01T17%3A00%3A00Z]"`,
      );
    });
  });
});
