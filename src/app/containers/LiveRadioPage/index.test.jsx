import React from 'react';
import LiveRadioPage from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import sampleProps from '../MediaPage/index.test';

const { liveRadioScaffoldProps } = sampleProps;

describe('Live Radio Page', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <LiveRadioPage {...liveRadioScaffoldProps} />,
    );
  });
});
