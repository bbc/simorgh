import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import InlineLink from './index';

describe('InlineLink', () => {
  describe('internal link', () => {
    shouldMatchSnapshot(
      'should render correctly',
      /* wrapping internal link to satisfy react-router, the process of mocking would be more work than value */
      <StaticRouter>
        <InlineLink href="/news/articles/c0000000027o">
          Internal Link
        </InlineLink>
      </StaticRouter>,
    );
  });

  describe('external link', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <InlineLink href="https://www.bbc.com/news">External Link</InlineLink>,
    );
  });
});
