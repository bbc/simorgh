import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import InlineLinkContainer from './index.new';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

describe('InlineLinkContainer', () => {
  describe('with link matching routes for SPA', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass come mocked context.
      */
      <StaticRouter>
        <InlineLinkContainer
          locator="/news/articles/c85pqyj5m2ko"
          blocks={[fragmentBlock('This is text for an internal link')]}
        />
      </StaticRouter>,
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
