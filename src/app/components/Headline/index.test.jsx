import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Headline from './index';

describe('Headline', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Headline>This is text with no formatting.</Headline>,
  );
});
