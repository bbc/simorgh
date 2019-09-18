import React from 'react';
import renderer from 'react-test-renderer';
import ArticleAtiParams from '.';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import { buildArticleATIUrl } from './buildParams';

jest.mock('./buildParams', () => {
  const buildParams = jest.requireActual('./buildParams');

  return {
    ...buildParams,
    buildArticleATIUrl: jest.fn(),
  };
});

const mockBuildArticleATIUrl = jest.fn().mockReturnValue(null);
buildArticleATIUrl.mockImplementation(mockBuildArticleATIUrl);

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
      <RequestContext.Provider value={requestContextStub}>
        <ArticleAtiParams {...mockArticleData} />
      </RequestContext.Provider>
    </ServiceContext.Provider>
  );
  const newsServiceContextStub = {
    service: 'news',
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: 0,
  };
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    id: 'c0000000000o',
    isAmp: false,
    pageType: 'article',
    pathname: '/pathname',
    previousPath: '/previous-path',
    service: 'news',
    statusCode: 200,
    atiAnalyticsAppName: 'news',
    atiAnalyticsProducerId: 0,
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call buildArticleATIUrl exactly once', () => {
      renderer.create(Component(newsServiceContextStub, requestContextStub));

      expect(mockBuildArticleATIUrl).toHaveBeenCalledTimes(1);
      expect(mockBuildArticleATIUrl).toHaveBeenCalledWith(
        mockArticleData,
        requestContextStub,
        newsServiceContextStub,
      );
    });
  });
});
