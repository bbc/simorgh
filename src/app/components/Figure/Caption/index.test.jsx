import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import Caption from './index';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Caption>
      <VisuallyHiddenText>Image caption,</VisuallyHiddenText>
      This is some Caption text
    </Caption>,
  );
});

