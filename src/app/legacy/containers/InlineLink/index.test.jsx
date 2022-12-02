import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import InlineLinkContainer from './index';

const fragmentBlock = (text, attributes = []) => ({
  id: '91238901',
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
      <ServiceContextProvider service="news">
        <InlineLinkContainer
          locator={locator}
          blocks={blocks}
          isExternal={isExternal}
        />
      </ServiceContextProvider>
    </StaticRouter>,
  );
};

// eslint-disable-next-line react/prop-types
const InlineLinkContext = ({ locator, isExternal, blocks, onClick }) => (
  <StaticRouter>
    <ServiceContextProvider service="news">
      <InlineLinkContainer
        locator={locator}
        blocks={blocks}
        isExternal={isExternal}
        onClick={onClick}
      />
    </ServiceContextProvider>
  </StaticRouter>
);

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
      <ServiceContextProvider service="news">
        <InlineLinkContainer
          locator="https://www.bbc.com/news"
          blocks={[fragmentBlock('This is bold text for a link', ['bold'])]}
          isExternal={false}
        />
      </ServiceContextProvider>,
    );
  });

  describe('external link accessibility', () => {
    shouldMatchSnapshot(
      'should be explicitly marked "external" for screen reader users',
      <ServiceContextProvider service="news">
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('This is a link')]}
          isExternal
        />
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should be explicitly marked "external" for screen reader users & localised',
      <ServiceContextProvider service="persian">
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('این لینک هست')]}
          isExternal
        />
      </ServiceContextProvider>,
    );
  });

  describe('onClick', () => {
    const mockOnClick = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });
    describe('onClick event on links', () => {
      it('should send event when onClick is not undefined', () => {
        const { getByText } = render(
          <InlineLinkContext
            locator="https://www.bbc.com/news"
            isExternal={false}
            blocks={[fragmentBlock('This is a link')]}
            onClick={mockOnClick}
          />,
        );

        const linkButton = getByText('This is a link');

        expect(mockOnClick.mock.calls.length).toBe(0);

        fireEvent.click(linkButton, { button: 0 });

        expect(mockOnClick.mock.calls.length).toBe(1);
      });

      it('should not send event when onClick is undefined', () => {
        const { getByText } = render(
          <InlineLinkContext
            locator="https://www.bbc.com/news"
            isExternal={false}
            blocks={[fragmentBlock('This is a link')]}
            onClick={undefined}
          />,
        );

        const linkButton = getByText('This is a link');

        fireEvent.click(linkButton, { button: 0 });

        expect(mockOnClick.mock.calls.length).toBe(0);
      });
    });
  });
});
