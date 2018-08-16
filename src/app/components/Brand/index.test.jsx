import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly with a default indented logo',
    <Brand />,
  );
  shouldMatchSnapshot(
    'should render correctly with indentedLogo false',
    <Brand indentedLogo={false} />,
  );
});
