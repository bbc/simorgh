import React from 'react';
import Header from './index';

import snapshotTestHelper from '../../../../src/__test__/snapshotTestHelper';

describe(`Header`, () => {
  snapshotTestHelper.shouldMatchSnapshot('should render correctly', <Header />);
});
