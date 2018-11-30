import React from 'react';
import BrandContainer from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`BrandContainer`, () => {
  shouldMatchSnapshot('should render correctly', <BrandContainer />);
});
