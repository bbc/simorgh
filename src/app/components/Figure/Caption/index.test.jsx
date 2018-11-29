import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

shouldMatchSnapshot(
  'should render Caption with some offscreen text',
  <Caption offscreenTextPrefix="Some offscreen text">
    This is some Caption text
  </Caption>,
);
