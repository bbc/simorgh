import { render, screen } from '@testing-library/react';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#contexts/AccountContext';
import AccountHeader from '.';

const renderWithProviders = ({ isSignedIn }: { isSignedIn: boolean }) =>
  render(
    <ServiceContextProvider service="ws">
      <ThemeProvider service="ws">
        <AccountContext.Provider
          value={{
            isSignedIn,
            signInUrl: 'https://example.com/signin',
            forYouUrl: 'https://example.com/foryou',
            idIdctaAvailable: true,
          }}
        >
          <AccountHeader />
        </AccountContext.Provider>
      </ThemeProvider>
    </ServiceContextProvider>,
  );

describe('AccountHeader', () => {
  it('shows Sign in when signed out', async () => {
    renderWithProviders({ isSignedIn: false });

    const link = await screen.findByRole('link', { name: 'Sign in' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('shows For you when signed in', async () => {
    renderWithProviders({ isSignedIn: true });

    const link = await screen.findByRole('link', { name: 'For you' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/foryou'),
    );
  });
});
