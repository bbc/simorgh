import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers';
import Figure from '.';

describe('Figure', () => {
  shouldMatchSnapshot('should render correctly', <Figure />);
});
