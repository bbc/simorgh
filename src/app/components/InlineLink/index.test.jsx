import React from 'react';
import InlineLink from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe(`InlineLink`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(
      <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
    ),
  );
});
