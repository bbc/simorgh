import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';

import AccountPromotionalBanner from '.';

type WithProvidersArgs = {
  isSignedIn: boolean;
};

const withProviders =
  ({ isSignedIn }: WithProvidersArgs) =>
  () => (
    <ThemeProvider service="ws">
      <ServiceContextProvider service="ws">
        <AccountContext.Provider
          value={{
            isSignedIn,
            isIdctaAvailable: true,
            signInUrl: 'https://example.com/signin',
            registerUrl: 'https://example.com/register',
            signOutUrl: undefined,
            settingsUrl: undefined,
            forYouUrl: undefined,
          }}
        >
          <AccountPromotionalBanner />
        </AccountContext.Provider>
      </ServiceContextProvider>
    </ThemeProvider>
  );

export default {
  title: 'Account/AccountPromotionalBanner',
  component: AccountPromotionalBanner,
};

export const SignedOut = withProviders({ isSignedIn: false });
export const SignedIn = withProviders({ isSignedIn: true });
