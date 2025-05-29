import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import AmpGeo from '.';

describe('AmpGeo', () => {
  shouldMatchSnapshot(
    'it should render amp-geo with inlined JSON data',
    <AmpGeo />,
  );
});
