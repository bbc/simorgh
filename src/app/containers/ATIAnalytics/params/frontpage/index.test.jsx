import React from 'react';
import renderer from 'react-test-renderer';
import * as atiPageViewParams from '../../atiUrl';
import * as commonTestUtils from '../../../../lib/analyticsUtils';
import * as testUtils from '../../../../lib/analyticsUtils/frontpage';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../../contexts/RequestContext';

import FrontPageAtiParams from '.';

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
      <RequestContextProvider {...requestContextStub}>
        <FrontPageAtiParams {...mockFPData} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  );
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    isAmp: false,
    pageType: 'frontpage',
    service: 'SERVICE',
  };
  const serviceContextStub = {
    atiAnalyticsAppName: 'news-SERVICE',
    brandName: 'BBC News SERVICE',
    service: 'SERVICE',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with the params from the Contexts', () => {
      const mock = jest.fn().mockReturnValue('key=value&key2=value2');
      atiPageViewParams.default = mock;

      renderer.create(Component(serviceContextStub, requestContextStub));

      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith({
        appName: 'news-SERVICE',
        contentId: 'urn:bbc:cps:b2ce8e02-168f-42c4-b78b-4780807445b4',
        contentType: 'index-home',
        language: 'LANGUAGE',
        pageIdentifier: 'SERVICE.page',
        pageTitle: 'PAGE TITLE - BBC News SERVICE',
        platform: 'canonical',
        service: 'SERVICE',
        statsDestination: 'WS_NEWS_LANGUAGES_TEST',
        timePublished: '2000-01-01T00:00:00.000Z',
        timeUpdated: '2001-01-01T00:00:00.000Z',
      });
    });

    it('should call front page utility functions with arguments', () => {
      testUtils.getContentId = jest.fn();
      testUtils.getLanguage = jest.fn();
      testUtils.getPageIdentifier = jest.fn();
      testUtils.getPageTitle = jest.fn();
      commonTestUtils.getPublishedDatetime = jest.fn();

      renderer.create(Component(serviceContextStub, requestContextStub));

      expect(testUtils.getContentId).toHaveBeenCalledTimes(1);
      expect(testUtils.getContentId).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getLanguage).toHaveBeenCalledTimes(1);
      expect(testUtils.getLanguage).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getPageIdentifier).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getPageTitle).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageTitle).toHaveBeenCalledWith(
        mockFPData,
        'BBC News SERVICE',
      );

      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledTimes(2);
      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'firstPublished',
        mockFPData,
      );
      expect(commonTestUtils.getPublishedDatetime).toHaveBeenCalledWith(
        'lastPublished',
        mockFPData,
      );
    });
  });
});
