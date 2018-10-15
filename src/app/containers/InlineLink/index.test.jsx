import React from 'react';
import { StaticRouter } from 'react-router-dom';
import {
  shouldMatchSnapshot,
  shouldShallowMatchSnapshot,
} from '../../helpers/tests/testHelpers';
import InlineLink from './index';

describe('InlineLink', () => {
  describe('with link matching routes for SPA', () => {
    shouldMatchSnapshot(
      'should render correctly',
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass come mocked context.
      */
      <StaticRouter>
        <InlineLink href="https://www.bbc.co.uk/news/articles/c0000000027o">
          Internal SPA article
        </InlineLink>
      </StaticRouter>,
    );

    shouldMatchSnapshot(
      'should render correctly for TEST',
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass come mocked context.
      */
      <StaticRouter>
        <InlineLink href="https://www.test.bbc.co.uk/news/articles/c0000000027o">
          Internal SPA article
        </InlineLink>
      </StaticRouter>,
    );
  });

  describe('with link not matching SPA route', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
    );
  });
});
