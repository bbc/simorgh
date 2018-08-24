import React from 'react';
import VisuallyHiddenText from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe('VisuallyHiddenText', () => {
  shouldMatchSnapshot(
    'should render off screen text for screen readers',
    shallowRender(<VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>),
  );
});
