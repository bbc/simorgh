import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import ActionButton from '.';
import metadata from './metadata.json';
import readme from './README.md';

type WithProvidersArgs = {
  isLoading?: boolean;
  disabled?: boolean;
  buttonText?: string;
  label?: string;
};

const withProviders =
  ({ 
    isLoading = false, 
    disabled = false, 
    buttonText = 'Save article', 
    label = 'Save this article' 
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
          }}
        >
          <ActionButton
            onClick={() => console.log('Button clicked')}
            isLoading={isLoading}
            disabled={disabled}
            label={label}
            buttonText={buttonText}
          />
        </AccountContext.Provider>
      </ServiceContextProvider>
    </ThemeProvider>
  );

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Unsaved = withProviders({
  buttonText: 'Save for later',
  label: 'Save this article',
});

export const Loading = withProviders({
  isLoading: true,
  buttonText: 'Saving',
  label: 'Saving article',
});

export const Saved = withProviders({
  buttonText: 'Saved to My News',
  label: 'Article has been saved',
});


export const Remove = withProviders({
  disabled: true,
  buttonText: 'Remove',
  label: 'Remove this article from saved',
});