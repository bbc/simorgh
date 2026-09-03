import { use, useEffect } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import Text from '#app/components/Text';
import CallToActionLink from '#app/components/CallToActionLink';
import { Close } from '#app/components/icons';
import { css } from '@emotion/react';

const styles = {
  overlay: css({
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '0.75rem',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '1rem',
    minWidth: '280px',
    maxWidth: '350px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  }),
  closeButton: css({
    background: 'none',
    border: 'none',
    padding: '0.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.7,
    },
  }),
  content: css({
    marginTop: '0.5rem',
  }),
  link: css({
    marginTop: '0.75rem',
    display: 'inline-block',
  }),
};

interface SaveArticleConfirmationProps {
  onClose: () => void;
}

const SaveArticleConfirmation = ({ onClose }: SaveArticleConfirmationProps) => {
  const { service } = use(ServiceContext);

  const confirmationText = 'Article saved to My News';
  const linkText = 'View My News';

  const myNewsPath = `/${service}/my-news`;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div css={styles.overlay} role="alert">
      <div css={styles.header}>
        <Text size="pica" fontVariant="sansBold">
          {confirmationText}
        </Text>
        <button
          type="button"
          onClick={onClose}
          css={styles.closeButton}
          aria-label="Close"
        >
          <Close width="16" height="16" />
        </button>
      </div>
      <div css={styles.content}>
        <CallToActionLink
          url={myNewsPath}
          css={styles.link}
          eventTrackingData={{
            componentName: 'save-article-confirmation-link',
          }}
        >
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {linkText}
          </CallToActionLink.Text>
        </CallToActionLink>
      </div>
    </div>
  );
};

export default SaveArticleConfirmation;
