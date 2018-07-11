import React from 'react';
import Headline from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Headline', () => {
  describe('with data', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Headline text="This is a headline" />,
    );
  });
});
