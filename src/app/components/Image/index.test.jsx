import React from 'react';
import Image from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Image', () => {
  shouldMatchSnapshot('should render correctly', <Image />);
});
