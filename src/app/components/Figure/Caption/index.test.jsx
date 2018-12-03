import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';
import VisuallyHiddenText from '../../VisuallyHiddenText';

shouldMatchSnapshot(
  'should render Caption with some offscreen text',
  <Caption>
    This is some Caption text
    <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
  </Caption>,
);
