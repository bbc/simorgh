import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ImagePlaceholderAmp from './index.amp';

describe('ImagePlaceholderAmp', () => {
  shouldMatchSnapshot(
    'should render normal version correctly',
    <amp-img src="foo" width="645px" height="128px">
      <ImagePlaceholderAmp />
    </amp-img>,
  );
  shouldMatchSnapshot(
    'should render dark mode version correctly',
    <amp-img src="foo" width="645px" height="128px">
      <ImagePlaceholderAmp darkMode />
    </amp-img>,
  );
});
