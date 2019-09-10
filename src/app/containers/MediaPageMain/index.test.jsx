import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import MediaPageMain from '.';
import { shouldShallowMatchSnapshot } from '#testHelpers';
import amharicConfig from '#lib/config/services/amharic';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import addIdsToBlocks from '../../routes/getInitialData/mediapage/addIdsToBlocks';

jest.mock('../Metadata', () => () => <div id="metadata" />);

const pageData = addIdsToBlocks(amharicPageData);

describe('Media Page Main', () => {
  shouldMatchSnapshot(
    'should match snapshot',
    <ServiceContext.Provider value={{ script: latin }}>
      <RequestContext.Provider
        value={{ platform: 'canonical', pageType: 'media' }}
      >
        <MediaPageMain service="amharic" pageData={pageData} />
      </RequestContext.Provider>
    </ServiceContext.Provider>,
  );
});
