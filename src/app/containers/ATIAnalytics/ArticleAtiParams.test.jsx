import React from 'react';
import renderer from 'react-test-renderer';
import ArticleAtiParams from './ArticleAtiParams';
import * as atiUrl from './atiUrl';
import * as testUtils from '../../lib/analyticsUtils/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

describe('ArticleAtiParams', () => {
  const mockArticleData = {
    content: {},
    metadata: {
      locators: { optimoUrn: 'urn:c0000000000o' },
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
    isUK: true,
    origin: 'https://www.bbc.co.uk',
    pageType: 'article',
    platform: 'canonical',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'news.articles.c0000000000o.page',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with the params from the Contexts', () => {
      const mock = jest.fn().mockReturnValue('key=value&key2=value2');
      atiUrl.atiPageViewParams = mock;

      renderer.create(Component(newsServiceContextStub, requestContextStub));

      expect(atiUrl.atiPageViewParams).toHaveBeenCalledTimes(1);
      expect(atiUrl.atiPageViewParams).toHaveBeenCalledWith({
        appName: 'news',
        contentType: 'article',
        isUK: true,
        language: 'language',
        ldpThingIds: 'id',
        ldpThingLabels: 'label',
        optimoUrn: 'urn:c0000000000o',
        pageIdentifier: 'news.articles.c0000000000o.page',
        pageTitle: 'A headline',
        platform: 'canonical',
        service: 'news',
        statsDestination: 'NEWS_PS_TEST',
        timePublished: '2000-01-01T00:00:00.000Z',
        timeUpdated: '2001-01-01T00:00:00.000Z',
      });
    });

    it('should call article utility functions with arguments', () => {
      testUtils.getLanguage = jest.fn();
      testUtils.getOptimoUrn = jest.fn();
      testUtils.getPageIdentifier = jest.fn();
      testUtils.getPromoHeadline = jest.fn();
      testUtils.getPublishedDatetime = jest.fn();
      testUtils.getThingAttributes = jest.fn();

      renderer.create(Component(newsServiceContextStub, requestContextStub));

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
      expect(testUtils.getOptimoUrn).toHaveBeenCalledTimes(1);
      expect(testUtils.getOptimoUrn).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledWith(
        'news',
        mockArticleData,
      );
      expect(testUtils.getPromoHeadline).toHaveBeenCalledTimes(1);
      expect(testUtils.getPromoHeadline).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getPublishedDatetime).toHaveBeenCalledTimes(2);
      expect(testUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'firstPublished',
        mockArticleData,
      );
      expect(testUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'lastPublished',
        mockArticleData,
      );
    });
  });
});
