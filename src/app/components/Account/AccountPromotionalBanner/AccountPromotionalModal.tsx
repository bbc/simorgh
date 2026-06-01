import { css, Global } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { AccountContext } from '#app/contexts/AccountContext';
import { Close } from '#app/components/icons';
import AccountPromotionalBanner from '.';
import styles from './index.styles';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';

type AccountPromotionalBannerModalProps = {
  onClose: () => void;
  signInUrl: string | undefined;
  registerUrl: string | undefined;
};

const AccountPromotionalBannerModal = ({
  onClose,
  signInUrl,
  registerUrl,
}: AccountPromotionalBannerModalProps) => {
  useEffect(() => {
    const modal = document.getElementById(
      'account-promotional-banner-modal-container',
    );
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

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };

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
        id="account-promotional-banner-modal-container"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Close modal"
          onClick={onClose}
          onKeyDown={handleBackdropKeyDown}
          css={styles.backdrop}
        />
        <div css={styles.modalContent}>
          <button
            type="button"
            onClick={onClose}
            css={styles.closeButton}
            aria-label="Close modal"
          >
            <Close />
          </button>
          <div css={styles.modalImageSide}>
            <img
              src="/images/globeImage.png"
              alt=""
              aria-hidden="true"
              css={styles.image}
            />
          </div>
          <ToggleContextProvider>
            <ThemeProvider service="ws">
              <AccountContext.Provider value={accountContextValue}>
                <AccountPromotionalBanner />
              </AccountContext.Provider>
            </ThemeProvider>
          </ToggleContextProvider>
        </div>
      </div>
    </>
  );
};

export default AccountPromotionalBannerModal;
