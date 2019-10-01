import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Unknown from '.';

describe('MediaPageBlocks Unknown', () => {
  shouldMatchSnapshot('should render correctly', <Unknown />);
});
