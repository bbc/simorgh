import React from 'react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

shouldMatchSnapshot(
  'should render Caption with some offscreen text',
  <Caption>
    This is some Caption text
    <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
  </Caption>,
);
