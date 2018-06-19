import React from 'react';
import Footer from './index';

import snapshotTestHelper from '../../../../src/__test__/snapshotTestHelper';

describe(`Footer`, () => {
  snapshotTestHelper.shouldMatchSnapshot('should render correctly', <Footer />);
});
