import React from 'react';
import MediaPage from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import amharicPageData from '../../../../data/amharic/bbc_amharic_radio/liveradio';

const liveRadioScaffoldProps = {
  service: 'amharic',
  isAmp: true,
  pageType: 'media',
  dials: {},
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
      pageData: amharicPageData,
    },
  },
  location: { pathname: '/korean/bbc_korean_radio/liveradio' },
};

describe('Media Page', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPage {...liveRadioScaffoldProps} />,
    );
  });
});
