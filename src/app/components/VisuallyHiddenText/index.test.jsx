import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  shouldMatchSnapshot(
    'should render off screen text for screen readers',
    <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>,
  );
});
