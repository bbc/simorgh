import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { IE9LimitOpen, IE9LimitClose } from '.';

describe('Timestamp', () => {
  shouldMatchSnapshot('should render IE9 limit comment open', <IE9LimitOpen />);

  shouldMatchSnapshot(
    'should render IE9 limit comment close',
    <IE9LimitClose />,
  );
});
