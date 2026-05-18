import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import README from './README.md';
import AccountPromotionalBanner from '.';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';

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
  decorators: [
    Story => {
      document
        .querySelector('html')
        ?.classList.add(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
      return <Story />;
    },
  ],
};

export const SignedOut = withProviders({ isSignedIn: false });
export const SignedInNoRender = withProviders({ isSignedIn: true });
