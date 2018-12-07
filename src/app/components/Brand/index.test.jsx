import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Brand brandName="Default Brand Name" />,
  );
});
