import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ResourceHints from './index';

describe('ResourceHints', () => {
  const props = {
    assetOrigins: ['http://foo.com', 'https://bar.com'],
  };

  shouldMatchSnapshot('should be correct', <ResourceHints {...props} />);
});
