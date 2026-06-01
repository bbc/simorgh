import { use, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import PromotionalBanner from '#app/components/PromotionalBanner';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useToggle from '#app/hooks/useToggle';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import onClient from '#app/lib/utilities/onClient';
import {
  setAccountPromoBannerDismissed,
  buildAccountBannerClientScript,
  DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
} from './utilities';
import styles from './index.styles';

const AccountPromotionalBanner = () => {
  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const { nonce } = use(RequestContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const [isDismissed, setIsDismissed] = useState(false);

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
      document
        .querySelector('html')
        ?.classList.remove(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
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
    <>
      {!onClient() && (
        <Helmet>
          {addInlineScript({
            script: buildAccountBannerClientScript(),
            nonce,
          })}
        </Helmet>
      )}
      <div css={styles.bannerWrapper} {...viewTracker}>
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
          <AccountActionButtons
            signInComponentName="account-promotional-banner-sign-in"
            registerComponentName="account-promotional-banner-register"
          />
        </PromotionalBanner>
      </div>
    </>
  );
};

export default AccountPromotionalBanner;
