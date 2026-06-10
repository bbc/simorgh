import { css, Global } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { AccountContext } from '#app/contexts/AccountContext';
import { Close } from '#app/components/icons';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import AccountPromotionalBanner from '../AccountPromotionalBanner';
import styles from './index.styles';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from '../AccountPromotionalBanner/utilities';

type AccountSignInModalProps = {
  onClose: () => void;
  signInUrl: string | undefined;
  registerUrl: string | undefined;
};

const AccountSignInModal = ({
  onClose,
  signInUrl,
  registerUrl,
}: AccountSignInModalProps) => {
  const { containerRef, firstElementRef } = useTrappedFocus<
    HTMLDivElement,
    HTMLButtonElement
  >();

  useEffect(() => {
    const modal = document.getElementById('account-sign-in-modal-container');
    const reactRootElement = document.getElementById('root');

    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      if (event.target === event.currentTarget) onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (modal) {
      reactRootElement?.setAttribute('inert', 'true');
      modal.addEventListener('mousedown', handleBackdropClick);
      modal.addEventListener('touchstart', handleBackdropClick);
      modal.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      reactRootElement?.removeAttribute('inert');
      modal?.removeEventListener('mousedown', handleBackdropClick);
      modal?.removeEventListener('touchstart', handleBackdropClick);
      modal?.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.add(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);

    return () => {
      document
        .querySelector('html')
        ?.classList.remove(DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS);
    };
  }, []);

  const accountContextValue = useMemo(
    () => ({
      isSignedIn: false,
      isIdctaAvailable: true,
      signInUrl,
      registerUrl,
      isPersonalizationAvailable: false,
      isPersonalizationEnabled: false,
      signOutUrl: undefined,
      settingsUrl: undefined,
      forYouUrl: undefined,
      hashedUserId: undefined,
    }),
    [signInUrl, registerUrl],
  );

  const staticAssetsPath = `${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;
  const imagesPath = `${staticAssetsPath}images`;

  // const signInImageVariables = {
  //   '--sign-in-image-mobile': `url(${imagesPath}/news_mobile_image.webp)`,
  //   '--sign-in-image-tablet': `url(${imagesPath}/news_tablet_image.webp)`,
  //   '--sign-in-image-desktop': `url(${imagesPath}/news_desktop_image.webp)`,
  // } as React.CSSProperties;

  const signInImageVariables = {
    '--sign-in-image-mobile':
      'url(https://raw.githubusercontent.com/bbc/simorgh/bfa8114d3c068fea3a7eaf952912c5a7c5f45fda/public/images/news_mobile_image.png)',
    '--sign-in-image-tablet':
      'url(https://raw.githubusercontent.com/bbc/simorgh/bfa8114d3c068fea3a7eaf952912c5a7c5f45fda/public/images/news_tablet_image.png)',
    '--sign-in-image-desktop':
      'url(https://raw.githubusercontent.com/bbc/simorgh/bfa8114d3c068fea3a7eaf952912c5a7c5f45fda/public/images/news_desktop_image.png)',
  } as React.CSSProperties;
  return (
    <>
      <Global
        styles={css`
          body {
            overflow: hidden;
          }
        `}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to BBC"
        css={styles.modal}
        id="account-sign-in-modal-container"
      >
        <div aria-hidden="true" onClick={onClose} css={styles.backdrop} />
        <div
          ref={containerRef}
          css={styles.modalContent}
          style={signInImageVariables}
        >
          <button
            ref={firstElementRef}
            type="button"
            onClick={onClose}
            css={styles.closeButton}
            aria-label="Close modal"
          >
            <Close />
          </button>
          <ToggleContextProvider>
            <ThemeProvider service="ws">
              <AccountContext.Provider value={accountContextValue}>
                <AccountPromotionalBanner
                  styleOverrides={styles.promotionalBannerOverrides}
                />
              </AccountContext.Provider>
            </ThemeProvider>
          </ToggleContextProvider>
        </div>
      </div>
    </>
  );
};

export default AccountSignInModal;
