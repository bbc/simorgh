import { use, useState } from 'react';
import { Helmet } from 'react-helmet';

import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import Paragraph from '#app/components/Paragraph';
import PromotionalBanner from '#app/components/PromotionalBanner';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import onClient from '#app/lib/utilities/onClient';
import { AccountContext } from '#contexts/AccountContext';
import styles from './index.styles';
import {
  buildAccountBannerClientScript,
  DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
  setAccountPromoBannerDismissed,
} from './utilities';

const AccountPromotionalBanner = () => {
  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const { nonce } = use(RequestContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const signInText = translations?.account?.signIn;
  const registerText = translations?.account?.register;
  const [isDismissed, setIsDismissed] = useState(false);

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
    <>
      {!onClient() && (
        <Helmet>
          {addInlineScript({ script: buildAccountBannerClientScript(), nonce })}
        </Helmet>
      )}
      <div css={styles.bannerWrapper}>
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
            document
              .querySelector('html')
              ?.classList.remove(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
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
      </div>
    </>
  );
};

export default AccountPromotionalBanner;
