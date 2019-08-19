import React from 'react';
import renderer from 'react-test-renderer';
import ArticleAtiParams from '.';
import * as atiPageViewParams from '../../atiUrl';
import * as commonTestUtils from '../../../../lib/analyticsUtils';
import * as testUtils from '../../../../lib/analyticsUtils/article';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../../contexts/RequestContext';

describe('ArticleAtiParams', () => {
  const mockArticleData = {
    content: {},
    metadata: {
      locators: { optimoUrn: 'urn:bbc:optimo:asset:c0000000000o' },
      passport: { language: 'language' },
      firstPublished: 946684800000,
      lastPublished: 978307200000,
      tags: {
        about: [
          {
            thingId: 'id',
            thingLabel: 'label',
          },
        ],
      },
    },
    promo: { headlines: { seoHeadline: 'A headline' } },
  };

  const Component = (newsServiceContextStub, requestContextStub) => (
    <ServiceContext.Provider value={newsServiceContextStub}>
      <RequestContextProvider {...requestContextStub}>
        <ArticleAtiParams {...mockArticleData} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  );
  const newsServiceContextStub = {
    service: 'news',
    atiAnalyticsAppName: 'news',
  };
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    id: 'c0000000000o',
    isAmp: false,
    pageType: 'article',
    previousPath: '/previous-path',
    service: 'news',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with the params from the Contexts', () => {
      const mock = jest.fn().mockReturnValue('key=value&key2=value2');
      atiPageViewParams.default = mock;

      renderer.create(Component(newsServiceContextStub, requestContextStub));

      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith({
        appName: 'news',
        contentId: 'urn:bbc:optimo:c0000000000o',
        contentType: 'article',
        isUK: true,
        language: 'language',
        ldpThingIds: 'id',
        ldpThingLabels: 'label',
        pageIdentifier: 'news.articles.c0000000000o.page',
        pageTitle: 'A headline',
        platform: 'canonical',
        service: 'news',
        statsDestination: 'NEWS_PS_TEST',
        timePublished: '2000-01-01T00:00:00.000Z',
        timeUpdated: '2001-01-01T00:00:00.000Z',
        previousPath: '/previous-path',
        origin: 'https://www.test.bbc.co.uk',
      });
    });

    it('should call article utility functions with arguments', () => {
      testUtils.getContentId = jest.fn();
      testUtils.getLanguage = jest.fn();
      testUtils.getPageIdentifier = jest.fn();
      testUtils.getPromoHeadline = jest.fn();
      testUtils.getThingAttributes = jest.fn();
      commonTestUtils.getPublishedDatetime = jest.fn();

      renderer.create(Component(newsServiceContextStub, requestContextStub));

      expect(testUtils.getContentId).toHaveBeenCalledTimes(1);
      expect(testUtils.getContentId).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getLanguage).toHaveBeenCalledTimes(1);
      expect(testUtils.getLanguage).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getThingAttributes).toHaveBeenCalledTimes(2);
      expect(testUtils.getThingAttributes).toHaveBeenCalledWith(
        'thingId',
        mockArticleData,
      );
      expect(testUtils.getThingAttributes).toHaveBeenCalledWith(
        'thingLabel',
        mockArticleData,
      );
      expect(testUtils.getPageIdentifier).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledWith(
        'news',
        mockArticleData,
      );
      expect(testUtils.getPromoHeadline).toHaveBeenCalledTimes(1);
      expect(testUtils.getPromoHeadline).toHaveBeenCalledWith(mockArticleData);
      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledTimes(2);
      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'firstPublished',
        mockArticleData,
      );
      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'lastPublished',
        mockArticleData,
      );
    });
  });
});
