import { use, useState } from 'react';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
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
    <PromotionalBanner
      id="account-promotional-banner"
      title={title}
      description={description}
      bannerLabel={title}
      closeLabel={closeLabel}
      buttonSeparatorText={buttonSeparatorText}
      isDismissible
      onClose={() => {
        setAccountPromoBannerDismissed();
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
