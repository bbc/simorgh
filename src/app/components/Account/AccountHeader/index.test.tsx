import { render, screen } from '@testing-library/react';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountProvider } from '../AccountContext';
import AccountHeader from '.';

const renderWithProviders = (
  initialConfig: Parameters<typeof AccountProvider>[0]['initialConfig'],
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
    renderWithProviders({
      availability: { signin: 'GREEN' },
      unavailable_url: 'https://example.com/unavailable',
      signin_url: 'https://example.com/signin',
      register_url: 'https://example.com/register',
      foryou_flagpole: 'GREEN',
      foryou_url: 'https://example.com/foryou',
    });

    const link = await screen.findByRole('link', { name: 'Sign in' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });
});
