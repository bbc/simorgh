import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import InlineLinkContainer from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const testInternalInlineLink = (description, locator, blocks, isExternal) => {
  shouldMatchSnapshot(
    description,
    /*
      for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
    */
    <StaticRouter>
      <InlineLinkContainer
        locator={locator}
        blocks={blocks}
        isExternal={isExternal}
      />
    </StaticRouter>,
  );
};

describe('InlineLinkContainer', () => {
  describe('link matching routes for SPA', () => {
    testInternalInlineLink(
      'should render correctly',
      'https://www.bbc.com/news/articles/c0g992jmmkko',
      [fragmentBlock('This is text for an internal link')],
      false,
    );

    testInternalInlineLink(
      'should render correctly for TEST environment',
      'https://www.test.bbc.com/news/articles/c0g992jmmkko',
      [fragmentBlock('This is text for an internal link')],
      false,
    );
  });

  describe('internal link not matching SPA route', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <InlineLinkContainer
        locator="https://www.bbc.com/news"
        blocks={[fragmentBlock('This is bold text for a link', ['bold'])]}
        isExternal={false}
      />,
    );
  });

  describe('external link accessibility', () => {
    shouldMatchSnapshot(
      'should be explicitly marked "external" for screen reader users',
      <ServiceContextProvider service="news">
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('This is a link', [])]}
          isExternal
        />
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should be explicitly marked "external" for screen reader users & localised',
      <ServiceContextProvider service="persian">
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('این لینک هست', [''])]}
          isExternal
        />
      </ServiceContextProvider>,
    );
  });
});
