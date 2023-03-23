import React from 'react';
import { StaticRouter } from 'react-router-dom';
import {
  render,
  fireEvent,
} from '../../../components/react-testing-library-with-providers';
import InlineLinkContainer from './index';

const fragmentBlock = (text, attributes = []) => ({
  id: '91238901',
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

// eslint-disable-next-line react/prop-types
const InlineLinkContext = ({ locator, isExternal, blocks, onClick }) => (
  <StaticRouter>
    <InlineLinkContainer
      locator={locator}
      blocks={blocks}
      isExternal={isExternal}
      onClick={onClick}
    />
  </StaticRouter>
);

describe('InlineLinkContainer', () => {
  describe('link matching routes for SPA', () => {
    it('should render correctly', () => {
      const { container } = render(
        /*
      for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
    */
        <StaticRouter>
          <InlineLinkContainer
            locator="https://www.bbc.com/news/articles/c0g992jmmkko"
            blocks={[fragmentBlock('This is text for an internal link')]}
            isExternal={false}
          />
        </StaticRouter>,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render correctly for TEST environment', () => {
      const { container } = render(
        /*
      for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
    */
        <StaticRouter>
          <InlineLinkContainer
            locator="https://www.test.bbc.com/news/articles/c0g992jmmkko"
            blocks={[fragmentBlock('This is text for an internal link')]}
            isExternal={false}
          />
        </StaticRouter>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('internal link not matching SPA route', () => {
    it('should render correctly', () => {
      const { container } = render(
        <InlineLinkContainer
          locator="https://www.bbc.com/news"
          blocks={[fragmentBlock('This is bold text for a link', ['bold'])]}
          isExternal={false}
        />,
        { service: 'news' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('external link accessibility', () => {
    it('should be explicitly marked "external" for screen reader users', () => {
      const { container } = render(
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('This is a link')]}
          isExternal
        />,
        { service: 'news' },
      );
      expect(container).toMatchSnapshot();
    });

    it('should be explicitly marked "external" for screen reader users & localised', () => {
      const { container } = render(
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('این لینک هست')]}
          isExternal
        />,
        { service: 'persian' },
      );
      expect(container).toMatchSnapshot();
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
});
