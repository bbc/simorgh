import React from 'react';
import MediaPageMain from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import amharicPageData from '../../../../data/amharic/bbc_amharic_radio/liveradio';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const liveRadioScaffoldProps = {
  service: 'amharic',
  pageData: amharicPageData,
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
    },
  },
};

describe('Media Page Main', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="media"
        service="amharic"
      >
        <ServiceContextProvider service="amharic">
          <MediaPageMain {...liveRadioScaffoldProps} />
        </ServiceContextProvider>
      </RequestContextProvider>,
    );
  });
});
