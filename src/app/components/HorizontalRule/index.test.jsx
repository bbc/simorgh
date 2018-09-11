import React from 'react';
import HorizontalRule from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Headline', () => {
  shouldMatchSnapshot('should render correctly', <HorizontalRule />);
});
