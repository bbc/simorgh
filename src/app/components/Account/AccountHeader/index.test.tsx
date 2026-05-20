import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import type { IdctaConfig } from '#app/models/types/account';
import AccountHeader from '.';

jest.mock('#hooks/useHydrationDetection', () => ({
  __esModule: true,
  default: () => true,
}));

const idctaConfig: IdctaConfig = {
  'id-availability': 'GREEN',
  unavailable_url: 'https://example.com/unavailable',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/foryou',
  initialIsSignedIn: false,
  identity: {
    idSignedInCookieName: 'ckns_id',
  },
};

const renderWithProviders = (overrides = {}) =>
  render(<AccountHeader />, {
    service: 'hindi',
    idctaConfig: { ...idctaConfig, ...overrides },
  });

describe('AccountHeader', () => {
  it('shows Sign in when signed out and account toggle is enabled for service', async () => {
    renderWithProviders();

    const link = await screen.findByRole('link', { name: 'साइन इन' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('does not render when account toggle is disabled for service', () => {
    render(<AccountHeader />, {
      service: 'hindi',
      idctaConfig: null,
    });

    expect(screen.queryByRole('link')).toBeNull();
  });

  it('shows Settings when signed in', async () => {
    renderWithProviders({ initialIsSignedIn: true });

    const link = await screen.findByRole('link', { name: 'आपका एकाउंट' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/settings'),
    );
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
