import { useState } from 'react';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountPromotionalBanner from '.';
import readme from './README.md';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';
import AccountSignInModal from '../AccountSignInModal';

export default {
  title: 'Account/AccountPromotionalBanner',
  component: AccountPromotionalBanner,
  globals: {
    service: { service: 'ws', variant: 'default' },
    idctaConfig: mockIdctaConfig,
    toggles: {
      account: { enabled: true },
    },
  },
  parameters: { docs: { readme } },
  decorators: [
    Story => {
      document
        .querySelector('html')
        ?.classList.add(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
      return <Story />;
    },
  ],
};

export const SignedOut = () => <AccountPromotionalBanner />;

export const SignedIn = () => <AccountPromotionalBanner />;
SignedIn.globals = {
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
};

export const SignedOutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalProps = {
    title: 'Sign in to save stories',
    description: 'Save stories and read them at your convenience',
    closeLabel: 'Close',
    signInText: 'Sign In',
    registerText: 'Register',
    signInAccessibleLabel: 'Sign in to My News',
    separatorText: 'or',
    signInUrl: 'https://example.com/signin',
    registerUrl: 'https://example.com/register',
  };

  return (
    <>
      <button
        type="button"
        css={{ padding: '0.5rem' }}
        onClick={() => setIsOpen(true)}
      >
        Open Sign In Modal
      </button>
      {isOpen && (
        <AccountSignInModal {...modalProps} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
