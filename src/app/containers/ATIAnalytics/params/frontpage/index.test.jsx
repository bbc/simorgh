import React from 'react';
import renderer from 'react-test-renderer';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildFrontPageATIUrl } from './buildParams';
import FrontPageAtiParams from '.';

jest.mock('./buildParams', () => {
  const buildParams = jest.requireActual('./buildParams');

  return {
    ...buildParams,
    buildFrontPageATIUrl: jest.fn(),
  };
});

const mockBuildArticleATIUrl = jest.fn().mockReturnValue(null);
buildFrontPageATIUrl.mockImplementation(mockBuildArticleATIUrl);

describe('FrontPageAtiParams', () => {
  const mockFPData = {
    content: {},
    metadata: {
      analyticsLabels: {
        counterName: 'SERVICE.page',
      },
      locators: {
        curie:
          'http://www.bbc.co.uk/asset/b2ce8e02-168f-42c4-b78b-4780807445b4/desktop/domestic',
      },
      language: 'LANGUAGE',
      title: 'PAGE TITLE',
      firstPublished: 946684800000,
      lastPublished: 978307200000,
    },
  };

  const Component = (serviceContextStub, requestContextStub) => (
    <ServiceContext.Provider value={serviceContextStub}>
      <RequestContext.Provider value={requestContextStub}>
        <FrontPageAtiParams {...mockFPData} />
      </RequestContext.Provider>
    </ServiceContext.Provider>
  );
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    isAmp: false,
    pageType: 'frontPage',
    pathname: '/pathname',
    service: 'SERVICE',
    statusCode: 200,
  };
  const serviceContextStub = {
    atiAnalyticsAppName: 'news-SERVICE',
    atiAnalyticsProducerId: 0,
    brandName: 'BBC News SERVICE',
    service: 'SERVICE',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with the params from the Contexts', () => {
      renderer.create(Component(serviceContextStub, requestContextStub));

      expect(mockBuildArticleATIUrl).toHaveBeenCalledTimes(1);
      expect(mockBuildArticleATIUrl).toHaveBeenCalledWith(
        mockFPData,
        requestContextStub,
        serviceContextStub,
      );
    });
  });
});
