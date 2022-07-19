import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import Figure from '.';

describe('Figure', () => {
  shouldMatchSnapshot('should render correctly', <Figure />);
});
