import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import InlineLink from './index';

describe(`InlineLink`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
  );
});
