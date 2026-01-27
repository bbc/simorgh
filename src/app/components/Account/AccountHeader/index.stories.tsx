import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '../AccountContext';
import AccountHeader from '.';

const withProviders =
  (isSignedIn: boolean) =>
    () => (
      <ThemeProvider service="ws">
      <ServiceContextProvider service="ws">
      <AccountContext.Provider
        value={{
          isSignedIn,
          signInUrl: 'https://example.com/signin',
          accountUrl: 'https://example.com/for-you',
          registerUrl: 'https://example.com/register',
          isSignInAvailable: true,
        }}
      >
      <AccountHeader />
      </AccountContext.Provider>
      </ServiceContextProvider>
      </ThemeProvider>
    );

export default {
  title: 'Account/AccountHeader',
  component: AccountHeader,
};

export const SignedOut = withProviders(false);
export const SignedIn = withProviders(true);