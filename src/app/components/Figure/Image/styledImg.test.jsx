import React from 'react';
import StyledImg from './styledImg';

import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';

describe('StyledImg', () => {
  shouldMatchSnapshot('should render correctly', <StyledImg />);
});
