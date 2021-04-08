import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import AmpGeo from '.';

describe('AmpGeo', () => {
  shouldMatchSnapshot(
    'it should render amp-geo with inlined JSON data',
    <AmpGeo />,
  );
});
