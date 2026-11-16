import { use, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
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
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);

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
        <AccountSignInModal
          title={translations.accountSignInModal?.title ?? ''}
          description={translations.accountSignInModal?.description ?? ''}
          closeLabel={translations.accountSignInModal?.closeLabel ?? 'Close'}
          signInText={translations.account?.signIn ?? ''}
          registerText={translations.account?.register ?? ''}
          signInAccessibleLabel={translations.account?.signInAccessibleLabel}
          separatorText={translations.accountPromoBanner?.buttonSeparatorText}
          onClose={() => setIsOpen(false)}
          signInUrl={signInUrl}
          registerUrl={registerUrl}
        />
      )}
    </>
  );
};
