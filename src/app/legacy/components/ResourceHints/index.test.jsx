import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import ResourceHints from './index';

describe('ResourceHints', () => {
  const props = {
    assetOrigins: ['http://foo.com', 'https://bar.com'],
  };

  shouldMatchSnapshot('should be correct', <ResourceHints {...props} />);
});
