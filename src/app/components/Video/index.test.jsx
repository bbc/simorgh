import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import Video from '.';
import { videoClipGlobalGuidance } from './helpers/fixtures';

describe('Video', () => {
  describe('with data', () => {
    shouldShallowMatchSnapshot(
      'should render the video with valid props',
      <Video {...videoClipGlobalGuidance} />,
    );
  });
});
