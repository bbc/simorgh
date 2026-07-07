import { Global } from '@emotion/react';
import { useEffect, use, useCallback } from 'react';
import { Close } from '#app/components/icons';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';

type AccountSignInModalProps = {
  onClose: () => void;
  signInUrl: string | undefined;
  registerUrl: string | undefined;
};

const AccountSignInModal = ({ onClose }: AccountSignInModalProps) => {
  const { containerRef, firstElementRef, lastElementRef } = useTrappedFocus<
    HTMLDivElement,
    HTMLAnchorElement,
    HTMLButtonElement
  >();

  const { translations } = use(ServiceContext);
  const {
    closeLabel = 'Close',
    title = '',
    description = '',
  } = translations.accountSignInModal ?? {};

  const viewTracker = useViewTracker({
    componentName: 'account-sign-in-modal',
  });

  const { onClick: onCloseClickTrack } = useClickTrackerHandler({
    componentName: 'account-sign-in-modal-close',
  });

  const handleClose = useCallback(
    (event?: React.MouseEvent) => {
      onCloseClickTrack?.(event);
      onClose();
    },
    [onCloseClickTrack, onClose],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <>
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-sign-in-modal-title"
        css={styles.modal}
        {...viewTracker}
      >
        <div aria-hidden="true" onClick={handleClose} css={styles.backdrop} />
        <div ref={containerRef} css={styles.modalContainer}>
          <div aria-hidden="true" css={styles.imageSection} />
          <div css={styles.textSection}>
            <Heading
              id="account-sign-in-modal-title"
              level={2}
              size="trafalgar"
              css={styles.title}
            >
              {title}
            </Heading>
            <Paragraph size="bodyCopy" css={styles.description}>
              {description}
            </Paragraph>
            <div css={styles.actionsContainer}>
              <AccountActionButtons
                signInRef={firstElementRef}
                signInComponentName="account-sign-in-modal-sign-in"
                registerComponentName="account-sign-in-modal-register"
              />
            </div>
          </div>
          <button
            ref={lastElementRef}
            type="button"
            onClick={handleClose}
            css={styles.closeButton}
            aria-label={closeLabel}
          >
            <Close css={styles.closeButtonIcon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountSignInModal;
