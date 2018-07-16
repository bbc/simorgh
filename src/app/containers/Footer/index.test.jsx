import React from 'react';
import FooterContainer from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`FooterContainer`, () => {
  shouldMatchSnapshot('should render correctly', <FooterContainer />);
});
