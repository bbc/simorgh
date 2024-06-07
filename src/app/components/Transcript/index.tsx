/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import Text from '../Text';
import TranscriptTimestamp from './TranscriptTimestamp';

const renderTranscriptItems = (transcriptBlocks: any) =>
  transcriptBlocks.map((item: any, index: number) => {
    if (!item) {
      return null;
    }
    const timestamp: string = item?.start;
    const text: string = item?.text;
    return (
      <li key={index} role="listitem">
        <Text>
          <TranscriptTimestamp timestamp={timestamp} />
          <span css={styles.itemText}>{text}</span>
        </Text>
      </li>
    );
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transcript = (transcript: any) => {
  // TODO add types and destructing etc
  const transcriptBlocks = transcript?.transcript?.blocks;
  if (!transcriptBlocks) {
    return null;
  }
  return (
    <details css={styles.transcript}>
      <summary css={styles.summary}>
        <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
          Read transcript
        </Text>
      </summary>
      <ul css={styles.ul}>{renderTranscriptItems(transcriptBlocks)}</ul>
      <Text size="brevier" css={styles.disclaimer}>
        This transcript was auto generated.
      </Text>
    </details>
  );
};

export default Transcript;
