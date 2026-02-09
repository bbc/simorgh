import Cookie from 'js-cookie';
import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import { IdctaConfig } from '#app/models/types/account';
import AccountHeader from '.';

const idctaConfig: IdctaConfig = {
  'id-availability': 'GREEN',
  unavailable_url: 'https://example.com/unavailable',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/foryou',
  identity: {
    idSignedInCookieName: 'ckns_id',
  },
};

const renderWithProviders = () =>
  render(<AccountHeader />, {
    service: 'ws',
    idctaConfig,
    toggles: {
      _environment: 'test',
      account: {
        enabled: true,
        value: 'ws',
      },
    },
  });

describe('AccountHeader', () => {
  afterEach(() => {
    Cookie.remove('ckns_id');
  });

  it('shows Sign in when signed out', async () => {
    renderWithProviders();

    const link = await screen.findByRole('link', { name: 'Sign In' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('does not render when account toggle is disabled for service', () => {
    render(<AccountHeader />, {
      service: 'ws',
      idctaConfig,
      toggles: {
        _environment: 'test',
        account: {
          enabled: true,
          value: 'hindi',
        },
      },
    });

    expect(screen.queryByRole('link')).toBeNull();
  });

  it('shows For you when signed in', async () => {
    Cookie.set('ckns_id', '1');

    renderWithProviders();

    const link = await screen.findByRole('link', { name: 'For you' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/foryou'),
    );
  });
});
