import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import InlineLink from './index';

describe('InlineLink', () => {
  describe('with link matching routes for SPA', () => {
    shouldMatchSnapshot(
      'should render correctly',
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass come mocked context.
      */
      <StaticRouter>
        <InlineLink href="/news/articles/c0000000027o">
          Internal SPA article
        </InlineLink>
      </StaticRouter>,
    );
  });

  describe('with link not matching SPA route', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
    );
  });
});
