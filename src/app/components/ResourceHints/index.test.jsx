import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ResourceHints from './index';

describe('ResourceHints', () => {
  const props = {
    assetDomains: ['foo.com', 'bar.com'],
  };

  shouldMatchSnapshot('should be correct', <ResourceHints {...props} />);
});
