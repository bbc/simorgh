import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import SaveButton from '.';
import metadata from './metadata.json';
import readme from './README.md';

type WithProvidersArgs = {
  isLoading?: boolean;
  disabled?: boolean;
  buttonText?: string;
  isSaved?: boolean;
  removeText?: string;
};

const withProviders =
  ({
    isLoading = false,
    disabled = false,
    isSaved = false,
    buttonText = 'Save article',
    removeText,
  }: WithProvidersArgs) =>
  () => (
    <ThemeProvider service="pidgin">
      <ServiceContextProvider service="pidgin">
        <AccountContext.Provider
          value={{
            isSignedIn: false,
            signInUrl: 'https://example.com/signin',
            registerUrl: 'https://example.com/register',
            isIdctaAvailable: true,
            settingsUrl: undefined,
            signOutUrl: undefined,
            forYouUrl: undefined,
            isAccountPromoBannerVisible: true,
          }}
        >
          <SaveButton
            onClick={() => console.log('Button clicked')}
            isLoading={isLoading}
            isSaved={isSaved}
            disabled={disabled}
            buttonText={buttonText}
            removeText={removeText}
          />
        </AccountContext.Provider>
      </ServiceContextProvider>
    </ThemeProvider>
  );

export default {
  title: 'Components/SaveButton',
  component: SaveButton,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Unsaved = withProviders({
  buttonText: 'Save for later',
});

export const Loading = withProviders({
  isLoading: true,
  buttonText: 'Saving',
});

export const Saved = withProviders({
  buttonText: 'Saved to My News',
  isSaved: true,
  removeText: 'Remove',
});
