import React from 'react';
import path from 'ramda/src/path';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import CpsAssetPageBlocks from '.';
import amharicPageData from '#data/pidgin/cpsAssets/tori-49450859';
import addIdsToBlocks from '../../routes/getInitialData/radioPage/addIdsToBlocks';

const pageData = addIdsToBlocks(amharicPageData);
const blocks = path(['content', 'blocks'], pageData);

describe('CpsAssetPageBlocks Blocks', () => {
  shouldMatchSnapshot(
    'should match snapshot',
    <ServiceContext.Provider value={{ service: 'news', script: latin }}>
      <RequestContext.Provider
        value={{
          platform: 'canonical',
          pageType: 'media',
          origin: 'http://localhost.bbc.co.uk:7080',
        }}
      >
        <CpsAssetPageBlocks blocks={blocks} />
      </RequestContext.Provider>
    </ServiceContext.Provider>,
  );
});
