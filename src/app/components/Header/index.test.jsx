import React from 'react';
import Header from './index';

import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';

describe(`Header`, () => {
  snapshotTestHelper.shouldMatchSnapshot('should render correctly', <Header />);
});
