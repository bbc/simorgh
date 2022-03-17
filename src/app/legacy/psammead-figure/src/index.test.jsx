import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Figure from '.';

describe('Figure', () => {
  shouldMatchSnapshot('should render correctly', <Figure />);
});
