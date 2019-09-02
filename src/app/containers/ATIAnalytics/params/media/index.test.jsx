import React from 'react';
import { render } from '@testing-library/react';
import * as atiPageViewParams from '../../atiUrl';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../../contexts/RequestContext';

import MediaAtiParams from '.';
import fixture from '../../../../../../data/indonesia/bbc_indonesian_radio/liveradio.json';

describe('MediaAtiParams', () => {
  const Component = (serviceContextStub, requestContextStub) => (
    <ServiceContext.Provider value={serviceContextStub}>
      <RequestContextProvider {...requestContextStub}>
        <MediaAtiParams {...fixture} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  );
  const requestContextStub = {
    bbcOrigin: 'https://www.test.bbc.co.uk',
    isAmp: false,
    pageType: 'media',
    service: 'SERVICE',
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
      const mock = jest.fn().mockReturnValue('key=value&key2=value2');
      atiPageViewParams.default = mock;

      render(Component(serviceContextStub, requestContextStub));

      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith({
        appName: 'news-SERVICE',
        contentId: 'urn:bbc:ares::ws_live:bbc_indonesian_radio',
        contentType: 'player-live',
        language: 'id-ID',
        pageIdentifier: 'indonesia.bbc_indonesian_radio.liveradio.page',
        pageTitle: 'BBC Indonesia Radio - BBC News Indonesia',
        producerId: 0,
        platform: 'canonical',
        service: 'SERVICE',
        statsDestination: 'WS_NEWS_LANGUAGES_TEST',
      });
    });
  });
});
