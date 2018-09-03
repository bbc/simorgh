import React from 'react';
import FooterContainer from './index';

import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`FooterContainer`, () => {
  shouldShallowMatchSnapshot('should render correctly', <FooterContainer />);
});
