import React from 'react';
import MediaPageMain from '.';
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

describe('Media Page Main', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPageMain {...liveRadioScaffoldProps} />,
    );
  });
});
