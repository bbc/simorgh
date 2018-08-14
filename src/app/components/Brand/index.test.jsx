import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly with indentedLogo true',
    <Brand indentedLogo />,
  );
  shouldMatchSnapshot(
    'should render correctly with indentedLogo false',
    <Brand indentedLogo={false} />,
  );
});
