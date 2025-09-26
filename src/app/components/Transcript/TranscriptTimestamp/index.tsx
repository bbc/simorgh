/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

// using span not time element to prevent text splitting bug on Talkback
export default ({ timestamp }: { timestamp: string }) => {
  return <span css={styles.time}>{timestamp}</span>;
};
