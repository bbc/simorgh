import React from 'react';
import NotFound from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('NotFound', () => {
  shouldMatchSnapshot('should render correctly', <NotFound />);
});
