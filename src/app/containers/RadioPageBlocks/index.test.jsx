import React from 'react';
import path from 'ramda/src/path';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import RadioPageBlocks from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import addIdsToBlocks from '../../routes/getInitialData/radioPage/addIdsToBlocks';

const pageData = addIdsToBlocks(amharicPageData);
const blocks = path(['content', 'blocks'], pageData);

const serviceContextMock = { service: 'amharic', script: latin, lang: 'am' };

describe('Radio Page Blocks', () => {
  shouldMatchSnapshot(
    'should match snapshot for Canonical',
    <ServiceContext.Provider value={serviceContextMock}>
      <RequestContext.Provider
        value={{
          platform: 'canonical',
          pageType: 'media',
          origin: 'http://localhost:7080',
        }}
      >
        <RadioPageBlocks blocks={blocks} />
      </RequestContext.Provider>
    </ServiceContext.Provider>,
  );

  shouldMatchSnapshot(
    'should match snapshot for AMP',
    <ServiceContext.Provider value={serviceContextMock}>
      <RequestContext.Provider
        value={{
          platform: 'amp',
          pageType: 'media',
          origin: 'http://localhost:7080',
        }}
      >
        <RadioPageBlocks blocks={blocks} />
      </RequestContext.Provider>
    </ServiceContext.Provider>,
  );
});
