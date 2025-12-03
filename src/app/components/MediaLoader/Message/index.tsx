/** @jsx jsx */

import { jsx } from '@emotion/react';
import styles from './index.styles';

type Props = {
  message?: string;
  placeholderSrc?: string;
  placeholderSrcset?: string;
};

const Message = ({
  message = '',
  placeholderSrc = '',
  placeholderSrcset = '',
}: Props) => (
  <div>
    {placeholderSrc && (
      <img
        alt=""
        src={placeholderSrc}
        srcSet={placeholderSrcset}
        aria-hidden="true"
        css={styles.messageImage}
      />
    )}
    <div css={styles.messageWrapper}>
      <strong css={styles.message}>{message}</strong>
    </div>
  </div>
);

export default Message;
