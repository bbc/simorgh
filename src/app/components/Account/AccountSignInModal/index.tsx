import { Global } from '@emotion/react';
import { useEffect, use } from 'react';
import { Close } from '#app/components/icons';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import { ServiceContext } from '#app/contexts/ServiceContext';
import SignInPromotionalBanner from '../SignInPromotionalBanner';
import styles from './index.styles';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from '../AccountPromotionalBanner/utilities';

type AccountSignInModalProps = {
  onClose: () => void;
  signInUrl: string | undefined;
  registerUrl: string | undefined;
};

const AccountSignInModal = ({ onClose }: AccountSignInModalProps) => {
  const { containerRef, firstElementRef } = useTrappedFocus<
    HTMLDivElement,
    HTMLButtonElement
  >();

  const { translations } = use(ServiceContext);
  const closeLabel = translations.accountPromoBanner?.closeLabel ?? 'Close';
  const titleLabel = translations.accountPromoBanner?.title ?? 'Sign in to BBC';

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
          <SignInPromotionalBanner />
        </div>
      </div>
    </>
  );
};

export default AccountSignInModal;
