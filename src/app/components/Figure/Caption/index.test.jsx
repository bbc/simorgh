import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

shouldMatchSnapshot(
  'should render Caption with some offscreen text',
  <Caption offscreenTextPrefix="Some offscreenn text">
    This is some Caption text
  </Caption>,
);
