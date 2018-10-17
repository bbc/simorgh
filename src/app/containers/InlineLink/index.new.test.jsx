import React from 'react';
import { StaticRouter } from 'react-router-dom';
import {
  shouldMatchSnapshot,
  shouldShallowMatchSnapshot,
} from '../../helpers/tests/testHelpers';
import InlineLinkContainer from './index.new';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const testInternalInlineLink = (description, locator, blocks) => {
  shouldMatchSnapshot(
    description,
    /*
      for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
    */
    <StaticRouter>
      <InlineLinkContainer locator={locator} blocks={blocks} />
    </StaticRouter>,
  );
};

describe('InlineLinkContainer', () => {
  describe('with link matching routes for SPA', () => {
    testInternalInlineLink(
      'should render correctly',
      'https://www.bbc.com/news/articles/c85pqyj5m2ko',
      [fragmentBlock('This is text for an internal link')],
    );

    testInternalInlineLink(
      'should render correctly for TEST environment',
      'https://www.test.bbc.com/news/articles/c85pqyj5m2ko',
      [fragmentBlock('This is text for an internal link')],
    );
  });

  describe('with link not matching SPA route', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <InlineLinkContainer
        locator="https://www.bbc.com/news"
        blocks={[fragmentBlock('This is bold text for a link', ['bold'])]}
      />,
    );
  });
});
