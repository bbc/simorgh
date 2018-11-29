import React from 'react';
import BrandContainer from './index';

import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`BrandContainer`, () => {
  shouldShallowMatchSnapshot('should render correctly', <BrandContainer />);
});
