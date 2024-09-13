/** @jsx jsx */
/* eslint-disable jsx-a11y/aria-role */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import Text from '../Text';
import TranscriptTimestamp from './TranscriptTimestamp';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { RightArrow as ArrowSvg } from '../icons';
import { TranscriptBlock, TranscriptItem } from './types';

// TO DO - move this to BFF
const removeHoursMilliseconds = (timestamp: string) => timestamp.slice(3, -4);

// const TranscriptListItem = (transcriptItem: TranscriptItem) => {
//   if (!transcriptItem) {
//     return null;
//   }
//   const timestamp: string = transcriptItem?.start;
//   const text: string = transcriptItem?.content;
//   const formattedTimestamp = removeHoursMilliseconds(timestamp);

//   return (
//     <li key={formattedTimestamp} css={styles.listItem}>
//       {/* A11Y TO DO -  see if we can avoid using role=text but still having content announced in one swipe on AT */}
//       <Text role="text" css={styles.transcriptText}>
//         <TranscriptTimestamp timestamp={formattedTimestamp} />
//         {/* A11Y TO DO -  check this doesn't introduce extra swipe on AT */}
//         <VisuallyHiddenText> </VisuallyHiddenText>
//         <span css={styles.itemText}>{text}</span>
//       </Text>
//     </li>
//   );
// };

const Transcript = ({
  transcript,
  title,
  hideDisclaimer = true,
}: {
  transcript: TranscriptBlock;
  title?: string;
  hideDisclaimer?: boolean;
}) => {
  const transcriptItems = transcript?.model?.blocks;
  if (!transcriptItems) {
    return null;
  }

  return (
    <details css={styles.details}>
      <summary css={styles.summary}>
        <ArrowSvg />
        <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
          Read transcripts
        </Text>
        {title && <VisuallyHiddenText>, {title}</VisuallyHiddenText>}
      </summary>
      <ul css={styles.ul} role="list">
        {/*  eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {transcriptItems.map((item, _index) => (
          <li key={item.start} css={styles.listItem}>
            {/* A11Y TO DO -  see if we can avoid using role=text but still having content announced in one swipe on AT */}
            <Text role="text" css={styles.transcriptText}>
              <TranscriptTimestamp
                timestamp={removeHoursMilliseconds(item.start)}
              />
              {/* A11Y TO DO -  check this doesn't introduce extra swipe on AT */}
              <VisuallyHiddenText> </VisuallyHiddenText>
              <span css={styles.itemText}>{item.content}</span>
            </Text>
          </li>
        ))}
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
