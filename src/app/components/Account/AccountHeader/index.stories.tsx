import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountHeader from '.';
import BrandContainer from '#app/legacy/containers/Brand';

type WithProvidersArgs = {
  isSignedIn: boolean;
};

const withProviders =
  ({ isSignedIn }: WithProvidersArgs) =>
  () => (
    <ThemeProvider service="hindi">
      <ServiceContextProvider service="hindi">
        <AccountContext.Provider
          value={{
            isSignedIn,
            signInUrl: 'https://example.com/signin',
            forYouUrl: 'https://example.com/for-you',
            isIdctaAvailable: true,
          }}
        >
          <BrandContainer>
            <AccountHeader />
          </BrandContainer>
        </AccountContext.Provider>
      </ServiceContextProvider>
    </ThemeProvider>
  );
export default {
  title: 'Account/AccountHeader',
  component: AccountHeader,
};

export const SignedOut = withProviders({ isSignedIn: false });
export const SignedIn = withProviders({ isSignedIn: true });
