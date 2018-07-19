import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import ResourceHints from './index';

describe('ResourceHints', () => {
  shouldMatchSnapshot('should be correct', <ResourceHints />);
});
