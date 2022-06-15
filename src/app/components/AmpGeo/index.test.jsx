import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import AmpGeo from '.';

describe('AmpGeo', () => {
  shouldMatchSnapshot(
    'it should render amp-geo with inlined JSON data',
    <AmpGeo />,
  );
});
