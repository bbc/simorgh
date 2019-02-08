import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ErrorMain from './index';

describe('ErrorMain', () => {
  shouldMatchSnapshot('should correctly render', <ErrorMain status={451} />);
});
