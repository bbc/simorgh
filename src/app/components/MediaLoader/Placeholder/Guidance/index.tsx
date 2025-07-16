import styles from './index.module.css';

type Props = {
  guidanceMessage?: string | null;
  noJsMessage?: string;
  className?: string;
};

const Guidance = ({
  guidanceMessage,
  noJsMessage = '',
  className = '',
}: Props) => (
  <div
    css={[
      styles.guidanceWrapper,
      guidanceMessage && styles.guidanceWrapperWithMessage,
    ]}
    data-e2e="media-player__guidance"
    {...(className ? { className } : undefined)}
  >
    {guidanceMessage && (
      <strong
        className={[styles.guidanceMessage, "guidance-message"].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        {guidanceMessage}
      </strong>
    )}
    <noscript className={[styles.guidanceMessage, styles.noscript].filter(Boolean).join(' ')}>
      <strong>{noJsMessage}</strong>
    </noscript>
  </div>
);

export default Guidance;
