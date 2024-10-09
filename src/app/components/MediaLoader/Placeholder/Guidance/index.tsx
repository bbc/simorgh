/** @jsx jsx */
import { jsx } from '@emotion/react';

import styles from './index.styles';

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
    {...(className && { className })}
  >
    {guidanceMessage && (
      <strong
        css={styles.guidanceMessage}
        className="guidance-message"
        aria-hidden="true"
      >
        {guidanceMessage}
      </strong>
    )}
    <noscript css={[styles.guidanceMessage, styles.noscript]}>
      <strong>{noJsMessage}</strong>
    </noscript>
  </div>
);

export default Guidance;
