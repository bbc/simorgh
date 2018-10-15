import React from 'react';
import { StaticRouter } from 'react-router-dom';
import {
  shouldMatchSnapshot,
  shouldShallowMatchSnapshot,
} from '../../helpers/tests/testHelpers';
import InlineLink from './index';

const testInternalInlineLink = (description, href) => {
  shouldMatchSnapshot(
    description,
    /*
      for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass come mocked context.
    */
    <StaticRouter>
      <InlineLink href={href}>Internal SPA article</InlineLink>
    </StaticRouter>,
  );
};

describe('InlineLink', () => {
  describe('with link matching routes for SPA', () => {
    testInternalInlineLink(
      'should render correctly',
      'https://www.bbc.co.uk/news/articles/c0000000027o',
    );

    testInternalInlineLink(
      'should render correctly for TEST',
      'https://www.test.bbc.co.uk/news/articles/c0000000027o',
    );
  });

  describe('with link not matching SPA route', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>,
    );
  });
});
