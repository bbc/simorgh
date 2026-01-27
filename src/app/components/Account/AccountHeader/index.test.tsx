import { render, screen } from '@testing-library/react';
import ThemeProvider from '#app/components/ThemeProvider';
import { AccountProvider } from '../AccountContext';
import AccountHeader from '.';

const renderWithProviders = (
  initialConfig: Parameters<typeof AccountProvider>[0]['initialConfig'],
) =>
  render(
    <ThemeProvider service="ws">
      <AccountProvider initialConfig={initialConfig}>
        <AccountHeader />
      </AccountProvider>
    </ThemeProvider>,
  );

describe('AccountHeader', () => {
  it('shows Sign in when signed out', () => {
    renderWithProviders({
      availability: { signin: 'GREEN' },
      unavailable_url: 'https://example.com/unavailable',
      signin_url: 'https://example.com/signin',
      register_url: 'https://example.com/register',
      'foryou-flagpole': 'GREEN',
      foryou_url: 'https://example.com/foryou',
    });

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });
});
