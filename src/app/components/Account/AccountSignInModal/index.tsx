import { Global } from '@emotion/react';
import { useEffect, use } from 'react';
import { Close } from '#app/components/icons';
import useTrappedFocus from '#app/hooks/useTrappedFocus';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
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
  } = translations.accountPromoBanner ?? {};
  const titleLabel = title || 'Sign in to BBC';

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
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titleLabel}
        css={styles.modal}
        id="account-sign-in-modal-container"
      >
        <div aria-hidden="true" onClick={onClose} css={styles.backdrop} />
        <div ref={containerRef} css={styles.modalContent}>
          <aside
            css={styles.banner}
            role="complementary"
            aria-labelledby="sign-in-promotional-banner"
          >
            <VisuallyHiddenText as="strong" id="sign-in-promotional-banner">
              {title}
            </VisuallyHiddenText>
            <div css={styles.innerContainer}>
              <div css={styles.content}>
                <div aria-hidden="true" css={styles.image} />
                <div css={styles.textContainer}>
                  <Heading level={2} size="trafalgar" css={styles.title}>
                    {title}
                  </Heading>
                  <Paragraph size="bodyCopy" css={styles.description}>
                    {description}
                  </Paragraph>
                </div>
                <div css={styles.actionsContainer}>
                  <AccountActionButtons
                    signInRef={firstElementRef}
                    signInComponentName="account-sign-in-modal-sign-in"
                    registerComponentName="account-sign-in-modal-register"
                  />
                </div>
              </div>
            </div>
          </aside>
          <button
            ref={lastElementRef}
            type="button"
            onClick={onClose}
            css={styles.closeButton}
            aria-label={closeLabel}
          >
            <Close />
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountSignInModal;
