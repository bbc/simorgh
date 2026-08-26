import { screen } from '@testing-library/react';
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

const InlineLinkContext = ({ locator, isExternal, blocks, onClick }) => (
  <InlineLinkContainer
    locator={locator}
    blocks={blocks}
    isExternal={isExternal}
    onClick={onClick}
  />
);

describe('InlineLinkContainer', () => {
  describe('internal link route', () => {
    it('should render correctly', () => {
      render(
        <InlineLinkContainer
          locator="https://www.bbc.com/news"
          blocks={[fragmentBlock('This is bold text for a link', ['bold'])]}
          isExternal={false}
        />,
        { service: 'news' },
      );
      expect(screen.getByRole('link')).toHaveAttribute('href', '/news');
    });
  });

  describe('external link accessibility', () => {
    it('should be explicitly marked "external" for screen reader users', () => {
      render(
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('This is a link')]}
          isExternal
        />,
        { service: 'news' },
      );
      expect(screen.getByRole('link')).toHaveAttribute('aria-label');
    });

    it('should be explicitly marked "external" for screen reader users & localised', () => {
      render(
        <InlineLinkContainer
          locator="https://www.example.com/"
          blocks={[fragmentBlock('این لینک هست')]}
          isExternal
        />,
        { service: 'persian' },
      );
      expect(screen.getByRole('link')).toHaveAttribute('aria-label');
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
