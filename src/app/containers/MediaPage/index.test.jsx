import React from 'react';
import MediaPage from '.';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';

const scaffoldProps = {
  service: 'amharic',
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
    },
  },
};

describe('FrontPageMain', () => {
  describe('snapshots', () => {
    shouldShallowMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPage {...scaffoldProps} />,
    );
  });
});
