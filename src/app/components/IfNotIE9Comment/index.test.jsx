import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { IfNotIE9Open, IfNotIE9Close } from '.';

describe('Timestamp', () => {
  shouldMatchSnapshot(
    'should render if not IE9 comment open',
    <IfNotIE9Open />,
  );

  shouldMatchSnapshot(
    'should render if not IE9 comment close',
    <IfNotIE9Close />,
  );
});
