import React from 'react';
import Header from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`Header`, () => {
  shouldMatchSnapshot('should render correctly', <Header />);
});
