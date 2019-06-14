import React from 'react';
import renderer from 'react-test-renderer';
import ArticleAtiParams from './ArticleAtiParams';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import * as atiUrl from './atiUrl';
import * as testUtils from '../../lib/analyticsUtils/article';

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
  };
  const requestContextStub = {
    isUK: true,
    platform: 'canonical',
    statsDestination: 'NEWS_PS_TEST',
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

    xit('should call atiPageViewParams with the functions - getlanguage with articledata', () => {
      const mockLanguage = jest.fn().mockReturnValue('language');
      testUtils.getLanguage = mockLanguage;

      renderer.create(Component(newsServiceContextStub, requestContextStub));

      expect(testUtils.getLanguage).toHaveBeenCalledTimes(1);
      expect(testUtils.getLanguage).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getThingAttributes).toHaveBeenCalledTimes(1);
      expect(testUtils.getThingAttributes).toHaveBeenCalledWith(
        'thingId',
        mockArticleData,
      );
      expect(testUtils.getThingAttributes).toHaveBeenCalledWith(
        'thingLabel',
        mockArticleData,
      );
      expect(testUtils.getOptimoUrn).toHaveBeenCalledWith(mockArticleData);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledWith(
        'news',
        mockArticleData,
      );
      expect(testUtils.getPromoHeadline).toHaveBeenCalledWith(mockArticleData);
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
