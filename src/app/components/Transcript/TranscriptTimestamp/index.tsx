/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

type myProps = {
  timestamp: string;
};

const TranscriptTimestamp = ({ timestamp }: myProps) => {
  return <time css={styles.time}>{timestamp}</time>;
};

export default TranscriptTimestamp;
