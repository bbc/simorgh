import React from 'react';
import Headline from './index';
import { containerText } from '../../models/blocks';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Headline', () => {
  describe('with data', () => {
    const data = containerText('This is a headline!');

    shouldMatchSnapshot('should render correctly', <Headline {...data} />);
  });
});
