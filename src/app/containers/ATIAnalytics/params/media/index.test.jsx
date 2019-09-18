import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import { buildMediaATIUrl } from './buildParams';

import MediaAtiParams from '.';
import fixture from '../../../../../../data/indonesia/bbc_indonesian_radio/liveradio.json';

jest.mock('./buildParams', () => {
  const buildParams = jest.requireActual('./buildParams');

  return {
    ...buildParams,
    buildMediaATIUrl: jest.fn(),
  };
});

const mockBuildArticleATIUrl = jest.fn().mockReturnValue(null);
buildMediaATIUrl.mockImplementation(mockBuildArticleATIUrl);

describe('MediaAtiParams', () => {
  const Component = (serviceContextStub, requestContextStub) => (
    <ServiceContext.Provider value={serviceContextStub}>
      <RequestContext.Provider value={requestContextStub}>
        <MediaAtiParams {...fixture} />
      </RequestContext.Provider>
    </ServiceContext.Provider>
  );
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    isAmp: false,
    pageType: 'media',
    pathname: '/pathname',
    service: 'SERVICE',
    statusCode: 200,
  };
  const serviceContextStub = {
    atiAnalyticsAppName: 'news-SERVICE',
    atiAnalyticsProducerId: 0,
    service: 'SERVICE',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams', () => {
      render(Component(serviceContextStub, requestContextStub));

      expect(mockBuildArticleATIUrl).toHaveBeenCalledTimes(1);
      expect(mockBuildArticleATIUrl).toHaveBeenCalledWith(
        fixture,
        requestContextStub,
        serviceContextStub,
      );
    });
  });
});
