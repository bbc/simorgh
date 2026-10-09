import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountSignInModal from '.';

const onClose = jest.fn();

const renderComponent = (service: 'ws' | 'hindi' = 'ws') =>
  render(<AccountSignInModal onClose={onClose} />, {
    service,
    idctaConfig: mockIdctaConfig,
  });

describe('AccountSignInModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as a dialog', () => {
    renderComponent();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the sign-in link with the accessible label from translations', () => {
    renderComponent();

    const signInLink = screen.getByRole('link', {
      name: 'Sign in to My News',
    });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('hides the visual "Sign In" text from screen readers', () => {
    renderComponent();

    const signInLink = screen.getByRole('link', {
      name: 'Sign in to My News',
    });
    const ariaHiddenSpan = signInLink.querySelector('[aria-hidden="true"]');
    expect(ariaHiddenSpan).toBeInTheDocument();
    expect(ariaHiddenSpan).toHaveTextContent('Sign In');
  });

  it('renders the service-localised accessible label for hindi', () => {
    renderComponent('hindi');

    const signInLink = screen.getByRole('link', {
      name: 'माय न्यूज़ में साइन इन करें',
    });
    expect(signInLink).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    renderComponent();

    screen.getByRole('button', { name: /close/i }).click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
