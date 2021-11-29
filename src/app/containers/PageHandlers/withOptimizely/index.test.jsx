import React from 'react';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';

import WithOptimizely from '.';

describe('withOptimizely HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>Hola Optimizely</h1>;
  const WithOptimizelyHOC = WithOptimizely(Component);
});
