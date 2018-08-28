import React from 'react';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import Caption from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../../helpers/tests/testHelpers';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(
      <Caption>
        <VisuallyHiddenText>Image caption,</VisuallyHiddenText>
        This is some Caption text
      </Caption>,
    ),
  );
});
