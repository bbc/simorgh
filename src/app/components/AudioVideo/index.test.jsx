import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import AudioVideo from '.';
import { videoClipGlobalGuidance } from './helpers/fixtures';

describe('AudioVideo', () => {
  describe('with data', () => {
    shouldShallowMatchSnapshot(
      'should render the video with valid props',
      <AudioVideo {...videoClipGlobalGuidance} />,
    );
  });
});
