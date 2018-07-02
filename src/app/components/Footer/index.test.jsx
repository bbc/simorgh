import React from 'react';
import Footer from './index';

import {shouldMatchSnapshot} from '../../helpers/tests/testHelpers';

describe(`Footer`, () => {
  shouldMatchSnapshot('should render correctly', <Footer />);
});
