import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import README from './README.md';
import AccountPromotionalBanner from '.';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';

type WithProvidersArgs = {
  isSignedIn: boolean;
};

const withProviders =
  ({ isSignedIn }: WithProvidersArgs) =>
  () => (
    <ToggleContextProvider>
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
              isAccountPromoBannerVisible: true,
            }}
          >
            <AccountPromotionalBanner />
          </AccountContext.Provider>
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );

export default {
  title: 'Account/AccountPromotionalBanner',
  component: AccountPromotionalBanner,
  parameters: {
    docs: {
      description: {
        component: README,
      },
    },
  },
};

export const SignedOut = withProviders({ isSignedIn: false });
export const SignedInNoRender = withProviders({ isSignedIn: true });
