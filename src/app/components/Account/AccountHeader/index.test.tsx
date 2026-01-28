import { render, screen } from '@testing-library/react';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountProvider } from '#contexts/AccountContext';
import { IdctaConfig } from '#app/models/types/account';
import Cookie from 'js-cookie';
import AccountHeader from '.';

const renderWithProviders = (
  initialConfig = {
    'id-availability': 'GREEN',
    unavailable_url: 'https://example.com/unavailable',
    signin_url: 'https://example.com/signin',
    register_url: 'https://example.com/register',
    foryou_url: 'https://example.com/foryou',
    identity: {
      idSignedInCookieName: 'ckns_id',
    },
  } as IdctaConfig,
) =>
  render(
    <ServiceContextProvider service="ws">
      <ThemeProvider service="ws">
        <AccountProvider initialConfig={initialConfig}>
          <AccountHeader />
        </AccountProvider>
      </ThemeProvider>
    </ServiceContextProvider>,
  );

describe('AccountHeader', () => {
  it('shows Sign in when signed out', async () => {
    renderWithProviders();

    const link = await screen.findByRole('link', { name: 'Sign in' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('shows For you when signed in', async () => {
    Cookie.set('ckns_id', '1');

    renderWithProviders();

    const link = await screen.findByRole('link', { name: 'For you' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/foryou'),
    );
    Cookie.remove('ckns_id');
  });
});
