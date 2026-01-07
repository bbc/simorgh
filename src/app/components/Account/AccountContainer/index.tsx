import { use } from 'react';
import Paragraph from '#app/components/Paragraph';
import { AccountContext } from '../AccountContext';
import PromotionalBanner from '../../PromotionalBanner';
import CallToActionLink from '../../CallToActionLink';
import styles from './index.styles';

export default function AccountContainer() {
  const { isSignInAvailable, signInUrl, registerUrl } = use(AccountContext);

  if (!isSignInAvailable || !signInUrl || !registerUrl) {
    return null;
  }

  return (
    <div>
      <PromotionalBanner
        title="Discover your BBC"
        description="Sign in or create an account to watch, listen and join in"
        bannerLabel="Discover your BBC"
      >
        <div css={styles.actionLinkWrapper}>
          <CallToActionLink
            url={signInUrl}
            className="focusIndicatorInvert"
            css={[styles.callToActionLink, styles.signInLnk]}
          >
            <CallToActionLink.ButtonLikeWrapper>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                Sign in
                <CallToActionLink.Chevron />
              </CallToActionLink.Text>
            </CallToActionLink.ButtonLikeWrapper>
          </CallToActionLink>

          <Paragraph size="bodyCopy" css={styles.orText}>
            Or
          </Paragraph>

          <CallToActionLink
            url={registerUrl}
            className="focusIndicatorInvert"
            css={[styles.callToActionLink, styles.registerLink]}
          >
            <CallToActionLink.ButtonLikeWrapper>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                Register
              </CallToActionLink.Text>
            </CallToActionLink.ButtonLikeWrapper>
          </CallToActionLink>
        </div>
      </PromotionalBanner>
    </div>
  );
}
