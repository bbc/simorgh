import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  shouldMatchSnapshot(
    'should render off screen text for screen readers',
    <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>,
  );
});
