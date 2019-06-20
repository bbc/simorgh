import React from 'react';

import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import Video from './index';
import exampleProps from './index.stories';

describe('Video', () => {
  describe('with data', () => {
    shouldShallowMatchSnapshot(
      'should render the video with valid props',
      <Video {...exampleProps} />,
    );
  });
});
