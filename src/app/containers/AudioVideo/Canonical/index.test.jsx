import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import Canonical from '.';

describe('Canonical', () => {
  const examplePID = 'p01k6msm';

  shouldMatchSnapshot(
    'should place Canonical container (landscape video) on page',
    <Canonical id={examplePID} portrait={false} />,
  );

  shouldMatchSnapshot(
    'should place Canonical container (portrait video) on page',
    <Canonical id={examplePID} portrait />,
  );
});
