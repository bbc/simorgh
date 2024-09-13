/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

const TranscriptTimestamp = ({ timestamp }: { timestamp: string }) => {
  return <time css={styles.time}>{timestamp}</time>;
};

export default TranscriptTimestamp;
