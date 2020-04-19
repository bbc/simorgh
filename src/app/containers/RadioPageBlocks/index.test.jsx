import React from 'react';
import path from 'ramda/src/path';
import { latin } from '@bbc/gel-foundations/scripts';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import RadioPageBlocks from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import getInitialData from '#app/routes/liveRadio/getInitialData';

const serviceContextMock = {
  service: 'amharic',
  script: latin,
  lang: 'am',
  translations: { mediaAssetPage: { audioPlayer: 'Audio player' } },
};

fetch.mockResponse(JSON.stringify(amharicPageData));

describe('Radio Page Blocks', () => {
  it('should match snapshot for Canonical', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');

    const blocks = path(['content', 'blocks'], pageData);

    await matchSnapshotAsync(
      <ServiceContext.Provider value={serviceContextMock}>
        <RequestContext.Provider
          value={{
            isAmp: false,
            platform: 'canonical',
            pageType: 'media',
            origin: 'http://localhost:7080',
          }}
        >
          <BrowserRouter>
            <RadioPageBlocks blocks={blocks} />
          </BrowserRouter>
        </RequestContext.Provider>
      </ServiceContext.Provider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');
    const blocks = path(['content', 'blocks'], pageData);

    await matchSnapshotAsync(
      <ServiceContext.Provider value={serviceContextMock}>
        <RequestContext.Provider
          value={{
            isAmp: true,
            platform: 'amp',
            pageType: 'media',
            origin: 'http://localhost:7080',
          }}
        >
          <BrowserRouter>
            <RadioPageBlocks blocks={blocks} />
          </BrowserRouter>
        </RequestContext.Provider>
      </ServiceContext.Provider>,
    );
  });
});
