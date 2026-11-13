import { use, useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PromotionalBanner from '#app/components/PromotionalBanner';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import onClient from '#app/lib/utilities/onClient';
import useAccountPromoBannerEligibility from './useAccountPromoBannerEligibility';
import {
  setAccountPromoBannerDismissed,
  buildAccountBannerClientScript,
  DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
  ACCOUNT_BANNER_DISMISS_KEY,
  ACCOUNT_BANNER_LAST_DISMISS_KEY,
  isAccountPromoBannerVisible,
} from './utilities';
import styles from './index.styles';

type AccountPromotionalBannerProps = {
  experimentName?: string;
  experimentVariant?: string;
  title?: string;
  description?: string;
};

const AccountPromotionalBanner = ({
  experimentName,
  experimentVariant,
  title: titleOverride,
  description: descriptionOverride,
}: AccountPromotionalBannerProps = {}) => {
  const isEligible = useAccountPromoBannerEligibility();
  const { translations } = use(ServiceContext);
  const { nonce } = use(RequestContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let visible = false;

    if (isEligible && accountPromoBannerTranslations && !isDismissed) {
      try {
        visible = isAccountPromoBannerVisible({
          cookies: document.cookie,
          dismissalCount: localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY),
          lastDismissed: localStorage.getItem(ACCOUNT_BANNER_LAST_DISMISS_KEY),
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to check account banner dismissal state', error);
      }
    }

    root.classList.toggle(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
      visible,
    );
    return () => {
      root.classList.remove(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
    };
  }, [isEligible, accountPromoBannerTranslations, isDismissed]);

  const viewTracker = useViewTracker({
    componentName: 'account-promotional-banner',
    ...(experimentName && { experimentName }),
    ...(experimentVariant && { experimentVariant }),
    ...(experimentVariant && { sendOptimizelyEvents: true }),
  });

  const { onClick: onCloseClickTrack } = useClickTrackerHandler({
    componentName: 'account-promotional-banner-close',
    ...(experimentName && { experimentName }),
    ...(experimentVariant && { experimentVariant }),
    ...(experimentVariant && { sendOptimizelyEvents: true }),
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

  if (isDismissed || !isEligible || !accountPromoBannerTranslations) {
    return null;
  }

  const {
    title: defaultTitle,
    description: defaultDescription,
    closeLabel,
    buttonSeparatorText,
  } = accountPromoBannerTranslations;

  const title = titleOverride ?? defaultTitle;
  const description = descriptionOverride ?? defaultDescription;

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
            experimentName={experimentName}
            experimentVariant={experimentVariant}
          />
        </PromotionalBanner>
      </div>
    </>
  );
};

export default AccountPromotionalBanner;
