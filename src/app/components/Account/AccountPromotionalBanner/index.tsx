import { use, useState } from 'react';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

const ACCOUNT_BANNER_DISMISS_KEY = 'account_promotional_banner_dismissals';
const ACCOUNT_BANNER_LAST_DISMISS_KEY =
  'account_promotional_banner_last_dismissed';
const ACCOUNT_BANNER_MAX_DISMISSALS = 3;
const ACCOUNT_BANNER_DISMISS_INTERVAL_MS = 10 * 24 * 60 * 60 * 1000; // 10 days

const getBannerDismissals = () =>
  parseInt(localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY) ?? '0', 10);

const getBannerLastDismissed = () =>
  parseInt(localStorage.getItem(ACCOUNT_BANNER_LAST_DISMISS_KEY) ?? '0', 10);

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
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const accountPromoBanner = translations?.accountPromoBanner;
  const [isDismissed, setIsDismissed] = useState(() => !isBannerVisible());

  if (
    isDismissed ||
    isSignedIn ||
    !isIdctaAvailable ||
    !signInUrl ||
    !registerUrl ||
    !accountPromoBanner
  ) {
    return null;
  }

  const { title, description, closeLabel, buttonSeparatorText } =
    accountPromoBanner;

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
      <div css={styles.actionLinkWrapper}>
        <CallToActionLink
          url={signInUrl}
          className="focusIndicatorInvert"
          css={[styles.callToActionLink, styles.signInLink]}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text shouldUnderlineOnHoverFocus>
              {translations?.account?.signIn}
              <CallToActionLink.Chevron />
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
              {translations?.account?.register}
              <CallToActionLink.Chevron />
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>
      </div>
    </PromotionalBanner>
  );
};

export default AccountPromotionalBanner;
