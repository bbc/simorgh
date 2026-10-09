import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountActionButtons from '.';

const defaultProps = {
  signInComponentName: 'test-sign-in',
  registerComponentName: 'test-register',
};

const renderComponent = (props = {}) =>
  render(<AccountActionButtons {...defaultProps} {...props} />, {
    service: 'ws',
    idctaConfig: mockIdctaConfig,
  });

describe('AccountActionButtons', () => {
  describe('sign-in link', () => {
    it('renders with accessible label from signInAccessibleLabel when provided', () => {
      renderComponent({ signInAccessibleLabel: 'Sign in to My News' });

      const signInLink = screen.getByRole('link', {
        name: 'Sign in to My News',
      });
      expect(signInLink).toBeInTheDocument();
      expect(signInLink).toHaveAttribute(
        'href',
        expect.stringContaining('https://example.com/signin'),
      );
    });

    it('hides the visual label and icon from screen readers when signInAccessibleLabel is provided', () => {
      renderComponent({ signInAccessibleLabel: 'Sign in to My News' });

      const signInLink = screen.getByRole('link', {
        name: 'Sign in to My News',
      });
      const ariaHiddenSpan = signInLink.querySelector('[aria-hidden="true"]');
      expect(ariaHiddenSpan).toBeInTheDocument();
      expect(ariaHiddenSpan).toHaveTextContent('Sign In');
    });

    it('renders with plain text accessible name when signInAccessibleLabel is not provided', () => {
      renderComponent();

      const signInLink = screen.getByRole('link', { name: /sign in/i });
      expect(signInLink).toBeInTheDocument();
      expect(signInLink.querySelector('span[aria-hidden="true"]')).toBeNull();
    });

    it('renders with the correct data-testid', () => {
      renderComponent();

      expect(screen.getByTestId('test-sign-in')).toBeInTheDocument();
    });
  });

  describe('register link', () => {
    it('renders with the correct data-testid', () => {
      renderComponent();

      expect(screen.getByTestId('test-register')).toBeInTheDocument();
    });

    it('links to the register URL', () => {
      renderComponent();

      const registerLink = screen.getByTestId('test-register');
      expect(registerLink).toHaveAttribute(
        'href',
        expect.stringContaining('https://example.com/register'),
      );
    });
  });

  it('returns null when URLs are unavailable', () => {
    render(<AccountActionButtons {...defaultProps} />, {
      service: 'ws',
      idctaConfig: null,
    });

    expect(screen.queryByTestId('test-sign-in')).toBeNull();
    expect(screen.queryByTestId('test-register')).toBeNull();
  });
});
