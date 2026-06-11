import { css, Global } from '@emotion/react';
import { useEffect, useMemo, use } from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { AccountContext } from '#app/contexts/AccountContext';
import { Close } from '#app/components/icons';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import { ServiceContext } from '#app/contexts/ServiceContext';
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

  const { translations } = use(ServiceContext);
  const closeLabel = translations.accountPromoBanner?.closeLabel ?? 'Close';
  const titleLabel = translations.accountPromoBanner?.title ?? 'Sign in to BBC';

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
      isRefreshAvailable: false,
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

  return (
    <>
      <Global styles={{ body: { overflow: 'hidden' } }} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titleLabel}
        css={styles.modal}
        id="account-sign-in-modal-container"
      >
        <div aria-hidden="true" onClick={onClose} css={styles.backdrop} />
        <div ref={containerRef} css={styles.modalContent}>
          <button
            ref={firstElementRef}
            type="button"
            onClick={onClose}
            css={styles.closeButton}
            aria-label={closeLabel}
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
