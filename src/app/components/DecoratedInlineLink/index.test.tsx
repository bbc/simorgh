import React from 'react';
import InlineLink from './index';
import { fireEvent, render } from '../react-testing-library-with-providers';

const fragmentBlock = (text: string, attributes?: string[]) => ({
  id: '91238901',
  type: 'fragment',
  model: {
    text,
    attributes: attributes ?? [],
  },
});

describe('InlineLink', () => {
  describe('internal link route', () => {
    it('should render correctly', () => {
      const { container } = render(
        <InlineLink
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
        <InlineLink
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
        <InlineLink
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
            <InlineLink
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
            <InlineLink
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
