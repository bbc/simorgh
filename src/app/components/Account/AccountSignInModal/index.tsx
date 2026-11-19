import { Global } from '@emotion/react';
import { useCallback } from 'react';
import { Close } from '#app/components/icons';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import useDismissOnOutsideInteraction from '#app/hooks/useDismissOnOutsideInteraction';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import AccountActionButtons, {
  AccountActionButtonsProps,
} from '#app/components/Account/AccountActionButtons';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';

export type AccountSignInModalProps = Omit<
  AccountActionButtonsProps,
  | 'signInRef'
  | 'onLightBackground'
  | 'signInComponentName'
  | 'registerComponentName'
> & {
  onClose: () => void;
  title: string;
  description: string;
  closeLabel: string;
  isDismissible?: boolean;
};

const AccountSignInModal = ({
  onClose,
  title,
  description,
  closeLabel,
  isDismissible: requestedIsDismissible = true,
  ...actionProps
}: AccountSignInModalProps) => {
  const isDismissible =
    requestedIsDismissible ||
    !actionProps.signInUrl ||
    !actionProps.registerUrl;

  const { containerRef, firstElementRef, lastElementRef } = useTrappedFocus<
    HTMLDivElement,
    HTMLAnchorElement,
    HTMLButtonElement
  >();

  const viewTracker = useViewTracker({
    componentName: 'account-sign-in-modal',
  });

  const { onClick: onCloseClickTrack } = useClickTrackerHandler({
    componentName: 'account-sign-in-modal-close',
  });

  const handleClose = useCallback(
    (event?: React.MouseEvent | MouseEvent | KeyboardEvent) => {
      onCloseClickTrack?.(event);
      onClose();
    },
    [onCloseClickTrack, onClose],
  );

  useDismissOnOutsideInteraction({
    onDismiss: handleClose,
    containerRef,
    enableOutsideClick: isDismissible,
    enableEscape: isDismissible,
  });

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
        <div aria-hidden="true" css={styles.backdrop} />
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
                {...actionProps}
                signInRef={firstElementRef}
                signInComponentName="account-sign-in-modal-sign-in"
                registerComponentName="account-sign-in-modal-register"
              />
            </div>
          </div>
          {isDismissible && (
            <button
              ref={lastElementRef}
              type="button"
              onClick={handleClose}
              css={styles.closeButton}
              aria-label={closeLabel}
            >
              <Close css={styles.closeButtonIcon} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountSignInModal;
