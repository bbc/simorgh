import { buildMostReadATIParams, buildMostReadATIUrl } from './buildParams';
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
  atiAnalyticsAppName: 'news-pidgin',
  atiAnalyticsProducerId: '70',
  service: 'pidgin',
  brandName: 'BBC News Pidgin',
  mostRead: { header: 'De one we dem de read well well' },
  lang: 'pcm',
};

const validURLParams = {
  appName: serviceContext.atiAnalyticsAppName,
  contentType: 'list-datadriven',
  language: 'pcm',
  pageIdentifier: 'pidgin.popular.read.page',
  pageTitle: 'De one we dem de read well well - BBC News Pidgin',
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

describe('mostRead buildParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildMostReadATIParams', () => {
    it('should return the right object', () => {
      const result = buildMostReadATIParams(
        pageData,
        requestContext,
        serviceContext,
      );
      expect(result).toEqual(validURLParams);
    });
  });

  describe('buildMostReadATIUrl', () => {
    it('should return the right url', () => {
      const result = buildMostReadATIUrl(
        pageData,
        requestContext,
        serviceContext,
      );
      expect(result).toMatchInlineSnapshot(
        `"s=598285&s2=70&p=pidgin.popular.read.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x2=[responsive]&x3=[news-pidgin]&x4=[pcm]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[list-datadriven]&x8=[simorgh]&x9=[De%2Bone%2Bwe%2Bdem%2Bde%2Bread%2Bwell%2Bwell%2B-%2BBBC%2BNews%2BPidgin]&x11=[2019-11-06T15%3A00%3A00Z]&x12=[2030-01-01T17%3A00%3A00Z]"`,
      );
    });
  });
});
