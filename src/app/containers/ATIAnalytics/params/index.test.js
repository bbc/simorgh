import { buildATIUrl, buildATIClickParams } from '.';
import {
  getPublishedDatetime,
  getCurrentTime,
} from '../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getThingAttributes,
} from '../../../lib/analyticsUtils/article';

jest.mock('../../../lib/analyticsUtils', () => {
  const utils = jest.requireActual('../../../lib/analyticsUtils');

  return {
    ...utils,
    getPublishedDatetime: jest.fn(),
    getCurrentTime: jest.fn(),
  };
});
jest.mock('../../../lib/analyticsUtils/article');

getCurrentTime.mockImplementation(() => '00:00:00');
getPublishedDatetime.mockImplementation(() => 'getPublishedDatetime');
getLanguage.mockImplementation(() => 'getLanguage');
getContentId.mockImplementation(() => 'getContentId');
getPageIdentifier.mockImplementation(() => 'getPageIdentifier');
getPromoHeadline.mockImplementation(() => 'getPromoHeadline');
getThingAttributes.mockImplementation(() => 'getThingAttributes');

const article = {};
const frontPage = {};
const media = {
  metadata: {
    id: 'id',
    language: 'language',
    analyticsLabels: {
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
    },
  },
};

describe('ATIAnalytics params', () => {
  describe('buildATIUrl', () => {
    it('should return the right article url', () => {
      const url = buildATIUrl(article, { pageType: 'article' }, {});
      expect(url).toEqual(
        's=598285&p=getPageIdentifier&r=0x0x24x24&re=1024x768&hl=00:00:00&lng=en-US&x1=[getContentId]&x2=[responsive]&x4=[getLanguage]&x5=[http://localhost/]&x7=[article]&x9=[getPromoHeadline]&x11=[getPublishedDatetime]&x12=[getPublishedDatetime]&x13=[getThingAttributes]&x14=[getThingAttributes]',
      );
    });

    it('should return the right frontPage url', () => {
      const url = buildATIUrl(frontPage, { pageType: 'frontPage' }, {});
      expect(url).toEqual(
        's=598285&p=unknown.page&r=0x0x24x24&re=1024x768&hl=00:00:00&lng=en-US&x2=[responsive]&x5=[http://localhost/]&x7=[index-home]&x11=[getPublishedDatetime]&x12=[getPublishedDatetime]',
      );
    });

    it('should return the right media url', () => {
      const url = buildATIUrl(media, { pageType: 'media' }, {});
      expect(url).toEqual(
        's=598285&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00:00:00&lng=en-US&x1=[id]&x2=[responsive]&x4=[language]&x5=[http://localhost/]&x7=[player-live]&x9=[pageTitle]',
      );
    });
  });

  describe('buildATIClickParams', () => {
    it('should return the right article params', () => {
      const params = buildATIClickParams(article, { pageType: 'article' }, {});
      expect(params).toEqual({
        appName: undefined,
        contentId: 'getContentId',
        contentType: 'article',
        isUK: undefined,
        language: 'getLanguage',
        ldpThingIds: 'getThingAttributes',
        ldpThingLabels: 'getThingAttributes',
        origin: undefined,
        pageIdentifier: 'getPageIdentifier',
        pageTitle: 'getPromoHeadline',
        platform: undefined,
        previousPath: undefined,
        producerId: undefined,
        service: undefined,
        statsDestination: undefined,
        timePublished: 'getPublishedDatetime',
        timeUpdated: 'getPublishedDatetime',
      });
    });

    it('should return the right frontPage params', () => {
      const params = buildATIClickParams(
        frontPage,
        { pageType: 'frontPage' },
        {},
      );
      expect(params).toEqual({
        appName: undefined,
        contentId: null,
        contentType: 'index-home',
        language: null,
        pageIdentifier: 'unknown.page',
        pageTitle: null,
        platform: undefined,
        producerId: undefined,
        service: undefined,
        statsDestination: undefined,
        timePublished: 'getPublishedDatetime',
        timeUpdated: 'getPublishedDatetime',
      });
    });

    it('should return the right media params', () => {
      const params = buildATIClickParams(media, { pageType: 'media' }, {});
      expect(params).toEqual({
        appName: undefined,
        contentId: 'id',
        contentType: 'player-live',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        platform: undefined,
        producerId: undefined,
        service: undefined,
        statsDestination: undefined,
      });
    });
  });
});
