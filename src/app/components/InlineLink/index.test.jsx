import React from 'react';
import InlineLink from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`InlineLink`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
  );
});
