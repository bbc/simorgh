import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { IfNotIE9Open, IfNotIE9Close } from '.';

describe('Timestamp', () => {
  shouldMatchSnapshot('should render IE9 limit comment open', <IfNotIE9Open />);

  shouldMatchSnapshot(
    'should render IE9 limit comment close',
    <IfNotIE9Close />,
  );
});
