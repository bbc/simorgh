import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Figure from '.';

describe('Figure', () => {
  shouldMatchSnapshot('should render correctly', <Figure />);
});
