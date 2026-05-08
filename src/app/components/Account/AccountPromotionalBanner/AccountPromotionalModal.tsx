import { css, Global } from '@emotion/react';
import { useState, useEffect, useMemo } from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import AccountPromotionalBanner from '.';
import styles from './index.styles';

type AccountPromotionalBannerModalProps = {
  isSignedIn: boolean;
};

const AccountPromotionalBannerModal = ({
  isSignedIn,
}: AccountPromotionalBannerModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const accountContextValue = useMemo(
    () => ({
      isSignedIn,
      isIdctaAvailable: true,
      signInUrl: 'https://example.com/signin',
      registerUrl: 'https://example.com/register',
      signOutUrl: undefined,
      settingsUrl: undefined,
      forYouUrl: undefined,
      isAccountPromoBannerVisible: true,
    }),
    [isSignedIn],
  );

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

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
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Close modal"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleBackdropKeyDown}
          css={styles.backdrop}
        />
        <div css={styles.modalContent}>
          <ToggleContextProvider>
            <ThemeProvider service="ws">
              <ServiceContextProvider service="ws">
                <AccountContext.Provider value={accountContextValue}>
                  <AccountPromotionalBanner />
                </AccountContext.Provider>
              </ServiceContextProvider>
            </ThemeProvider>
          </ToggleContextProvider>
        </div>
      </div>
    </>
  );
};

export default AccountPromotionalBannerModal;
