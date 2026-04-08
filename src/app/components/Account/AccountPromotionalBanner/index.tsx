import { use, useState } from 'react';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useToggle from '#app/hooks/useToggle';
import styles from './index.styles';

const ACCOUNT_BANNER_DISMISS_KEY = 'account_promotional_banner_dismissals';
const ACCOUNT_BANNER_LAST_DISMISS_KEY =
  'account_promotional_banner_last_dismissed';
const ACCOUNT_BANNER_MAX_DISMISSALS = 3;
const ACCOUNT_BANNER_DISMISS_INTERVAL_MS = 10 * 24 * 60 * 60 * 1000; // 10 days

const getBannerDismissals = () => {
  const accountBannerDismissValue = localStorage.getItem(
    ACCOUNT_BANNER_DISMISS_KEY,
  );
  return parseInt(accountBannerDismissValue ?? '0', 10);
};

const getBannerLastDismissed = () => {
  const accountBannerLastDismissValue = localStorage.getItem(
    ACCOUNT_BANNER_LAST_DISMISS_KEY,
  );
  return parseInt(accountBannerLastDismissValue ?? '0', 10);
};

const setBannerDismissed = () => {
  const dismissals = getBannerDismissals() + 1;
  localStorage.setItem(ACCOUNT_BANNER_DISMISS_KEY, String(dismissals));
  localStorage.setItem(ACCOUNT_BANNER_LAST_DISMISS_KEY, String(Date.now()));
};

const isBannerVisible = () => {
  if (typeof window === 'undefined') return false;
  const dismissals = getBannerDismissals();
  const lastDismissed = getBannerLastDismissed();
  const now = Date.now();
  if (dismissals >= ACCOUNT_BANNER_MAX_DISMISSALS) return false;
  if (lastDismissed && now - lastDismissed < ACCOUNT_BANNER_DISMISS_INTERVAL_MS)
    return false;
  return true;
};

const AccountPromotionalBanner = () => {
  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const isHydrated = useHydrationDetection();
  const { translations } = use(ServiceContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const signInText = translations?.account?.signIn;
  const registerText = translations?.account?.register;
  const [isDismissed, setIsDismissed] = useState(() => !isBannerVisible());

  if (
    isDismissed ||
    isSignedIn ||
    !accountEnabled ||
    !isIdctaAvailable ||
    !signInUrl ||
    !registerUrl ||
    !accountPromoBannerTranslations ||
    !isHydrated
  ) {
    return null;
  }

  const { title, description, closeLabel, buttonSeparatorText } =
    accountPromoBannerTranslations;

  return (
    <PromotionalBanner
      id="account-promotional-banner"
      title={title}
      description={description}
      bannerLabel={title}
      closeLabel={closeLabel}
      buttonSeparatorText={buttonSeparatorText}
      isDismissible
      onClose={() => {
        setBannerDismissed();
        setIsDismissed(true);
      }}
    >
      <CallToActionLink
        url={signInUrl}
        className="focusIndicatorInvert"
        css={[styles.callToActionLink, styles.signInLink]}
      >
        <CallToActionLink.ButtonLikeWrapper>
          <AccountIcon css={styles.accountIcon} />
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {signInText}
          </CallToActionLink.Text>
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>

      <Paragraph size="bodyCopy" css={styles.buttonSeparatorText}>
        {buttonSeparatorText}
      </Paragraph>

      <CallToActionLink
        url={registerUrl}
        className="focusIndicatorInvert"
        css={[styles.callToActionLink, styles.registerLink]}
      >
        <CallToActionLink.ButtonLikeWrapper>
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {registerText}
          </CallToActionLink.Text>
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>
    </PromotionalBanner>
  );
};

export default AccountPromotionalBanner;
