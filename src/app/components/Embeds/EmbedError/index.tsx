/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

type Props = {
  message: string;
  link: {
    text: string;
    href: string;
  };
};

const EmbedError = ({ message, link }: Props) => {
  return (
    <div css={styles.embedDiv}>
      <div>
        <strong css={styles.errorMessage}>{message}</strong>
      </div>
      {link && link.text && link.href && (
        <a href={link.href} css={styles.errorLink}>
          {link.text}
        </a>
      )}
    </div>
  );
};

export default EmbedError;
