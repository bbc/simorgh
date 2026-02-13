import { use, useState } from 'react';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

const AccountPromotionalBanner = () => {
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const [isDismissed, setIsDismissed] = useState(false);

  if (
    isDismissed ||
    isSignedIn ||
    !isIdctaAvailable ||
    !signInUrl ||
    !registerUrl
  ) {
    return null;
  }

  return (
    <PromotionalBanner
      id="account-promotional-banner"
      title={translations?.promoBanner?.title || 'Discover your BBC'}
      description={
        translations?.promoBanner?.description ||
        'Sign in or create an account to watch, listen and join in'
      }
      bannerLabel={translations?.promoBanner?.title || 'Discover your BBC'}
      closeLabel={translations?.promoBanner?.closeLabel || 'Close'}
      orText={translations?.account?.or || 'or'}
      isDismissible
      onClose={() => setIsDismissed(true)}
    >
      <div css={styles.actionLinkWrapper}>
        <CallToActionLink
          url={signInUrl}
          className="focusIndicatorInvert"
          css={[styles.callToActionLink, styles.signInLink]}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text shouldUnderlineOnHoverFocus>
              {translations?.account?.signIn || 'Sign In'}
              <CallToActionLink.Chevron />
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>

        <Paragraph size="bodyCopy" css={styles.orText}>
          {translations?.account?.or || 'or'}
        </Paragraph>

        <CallToActionLink
          url={registerUrl}
          className="focusIndicatorInvert"
          css={[styles.callToActionLink, styles.registerLink]}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text shouldUnderlineOnHoverFocus>
              {translations?.account?.register || 'Register'}
              <CallToActionLink.Chevron />
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>
      </div>
    </PromotionalBanner>
  );
};

export default AccountPromotionalBanner;
