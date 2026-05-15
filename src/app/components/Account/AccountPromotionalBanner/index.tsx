import { use, useState, useCallback } from 'react';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';
import { setAccountPromoBannerDismissed } from './utilities';

const AccountPromotionalBanner = () => {
  const { enabled: accountEnabled } = useToggle('account');
  const {
    isSignedIn,
    isIdctaAvailable,
    signInUrl,
    registerUrl,
    isAccountPromoBannerVisible,
  } = use(AccountContext);
  const { translations } = use(ServiceContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const signInText = translations?.account?.signIn;
  const registerText = translations?.account?.register;
  const [isDismissed, setIsDismissed] = useState(!isAccountPromoBannerVisible);

  const viewTracker = useViewTracker({
    componentName: 'account-promotional-banner',
  });

  const { onClick: onCloseClickTrack } = useClickTrackerHandler({
    componentName: 'account-promotional-banner-close',
  });

  const handleCloseClick = useCallback(
    async (event?: React.MouseEvent) => {
      if (onCloseClickTrack) {
        await onCloseClickTrack(event);
      }
      setAccountPromoBannerDismissed();
      setIsDismissed(true);
    },
    [onCloseClickTrack],
  );

  if (
    isDismissed ||
    isSignedIn ||
    !accountEnabled ||
    !isIdctaAvailable ||
    !signInUrl ||
    !registerUrl ||
    !accountPromoBannerTranslations
  ) {
    return null;
  }

  const { title, description, closeLabel, buttonSeparatorText } =
    accountPromoBannerTranslations;

  return (
    <div {...viewTracker}>
      <PromotionalBanner
        id="account-promotional-banner"
        title={title}
        description={description}
        bannerLabel={title}
        closeLabel={closeLabel}
        buttonSeparatorText={buttonSeparatorText}
        isDismissible
        onClose={handleCloseClick}
      >
        <CallToActionLink
          url={signInUrl}
          className="focusIndicatorInvert"
          css={[styles.callToActionLink, styles.signInLink]}
          eventTrackingData={{
            componentName: 'account-promotional-banner-sign-in',
          }}
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
          eventTrackingData={{
            componentName: 'account-promotional-banner-register',
          }}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text shouldUnderlineOnHoverFocus>
              {registerText}
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>
      </PromotionalBanner>
    </div>
  );
};

export default AccountPromotionalBanner;
