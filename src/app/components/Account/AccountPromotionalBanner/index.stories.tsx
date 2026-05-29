import AccountPromotionalBanner from '.';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import readme from './README.md';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';
import AccountPromotionalBannerModal from './AccountPromotionalModal';

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

export const SignedOutModal = () => (
  <AccountPromotionalBannerModal
  onClose={() => {}}
  signInUrl="https://example.com/signin"
  registerUrl="https://example.com/register"
  />
  );