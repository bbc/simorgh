import React from 'react';
import Footer from './index';

import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';

describe(`Footer`, () => {
  snapshotTestHelper.shouldMatchSnapshot('should render correctly', <Footer />);
});
