import React from 'react';
import MediaPage from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';

const liveRadioScaffoldProps = {
  service: 'amharic',
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
    },
  },
};

describe('Media Page', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPage {...liveRadioScaffoldProps} />,
    );
  });
});
