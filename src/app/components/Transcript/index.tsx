/* eslint-disable jsx-a11y/aria-role */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import Text from '../Text';
import TranscriptTimestamp from './TranscriptTimestamp';
import VisuallyHiddenText from '../VisuallyHiddenText';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTranscriptItems = (transcriptBlocks: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transcriptBlocks.map((item: any, index: number) => {
    if (!item) {
      return null;
    }
    const timestamp: string = item?.start;
    const text: string = item?.content;

    // Removes hours and miliseconds
    // TO DO - move this to BFF
    const formattedTimestamp = timestamp.slice(3, -4);
    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index} css={styles.listItem}>
        {/* TO DO -  see if we can avoid using role=text but still having content announced in one swipe on AT */}
        <Text role="text" css={styles.transcriptText}>
          <TranscriptTimestamp timestamp={formattedTimestamp} />
          {/* TO DO -  check this doesn't introduce extra swipe on AT */}
          <VisuallyHiddenText> </VisuallyHiddenText>
          <span css={styles.itemText}>{text}</span>
        </Text>
      </li>
    );
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transcript = ({ transcript, title, hideDisclaimer = true }: any) => {
  // TO DO - FIX TYPES SO TITLE COMES THROUGH
  // TODO add types and destructing etc
  const transcriptBlocks = transcript?.model?.blocks;
  if (!transcriptBlocks) {
    return null;
  }
  return (
    <details css={styles.details}>
      <summary css={styles.summary}>
        <span css={styles.arrowContainer} id="arrowContainer">
          <span css={styles.arrowShape} id="arrowShape" />
        </span>
        <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
          Read transcript
        </Text>
        <VisuallyHiddenText>, {title}</VisuallyHiddenText>
      </summary>
      <ul css={styles.ul} role="list">
        {renderTranscriptItems(transcriptBlocks)}
      </ul>
      {!hideDisclaimer && (
        <Text size="brevier" css={styles.disclaimer} as="small">
          This transcript was auto generated.
        </Text>
      )}
    </details>
  );
};

export default Transcript;
