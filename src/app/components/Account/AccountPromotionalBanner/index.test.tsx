import Cookie from 'js-cookie';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '#app/components/react-testing-library-with-providers';
import type { IdctaConfig } from '#app/models/types/account';

import AccountPromotionalBanner from '.';

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

const renderWithProviders = (idctaOverrides: Partial<IdctaConfig> = {}) =>
  render(<AccountPromotionalBanner />, {
    service: 'ws',
    idctaConfig: { ...idctaConfig, ...idctaOverrides },
  });

describe('AccountPromotionalBanner', () => {
  afterEach(() => {
    Cookie.remove('ckns_id');
  });

  it('renders when signed out and IDCTA is available', async () => {
    renderWithProviders();

    expect(
      await screen.findByRole('heading', { name: 'Discover your BBC' }),
    ).toBeInTheDocument();

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );

    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/register'),
    );
  });

  it('does not render when signed in', () => {
    Cookie.set('ckns_id', '1');

    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('can be dismissed via close button', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when IDCTA is not available', () => {
    renderWithProviders({ 'id-availability': 'RED' });

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when sign in url is missing', () => {
    renderWithProviders({ signin_url: '' });

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when register url is missing', () => {
    renderWithProviders({ register_url: '' });

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });
});
