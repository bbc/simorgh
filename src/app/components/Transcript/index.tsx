/** @jsx jsx */
/* eslint-disable jsx-a11y/aria-role */
import { jsx } from '@emotion/react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext } from 'react';
import styles from './index.styles';
import Text from '../Text';
import TranscriptTimestamp from './TranscriptTimestamp';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { RightArrow as ArrowSvg } from '../icons';
import { TranscriptBlock, TranscriptItem } from './types';

const DEAFULT_TRANSLATIONS = {
  readTranscript: 'Read transcript',
  disclaimer:
    ' This transcript has been reviewed by a journalist, it was generated with AI (artificial intelligence).',
};

const TranscriptListItem = ({ id, start, content }: TranscriptItem) => (
  <li key={id} css={styles.listItem}>
    <Text role="text" css={styles.transcriptText} size="bodyCopy">
      <TranscriptTimestamp timestamp={start} />
      <VisuallyHiddenText> </VisuallyHiddenText>
      <span css={styles.itemText}>{content}</span>
    </Text>
  </li>
);

const Transcript = ({
  transcript,
  title,
}: {
  transcript: TranscriptBlock;
  title?: string;
}) => {
  const { translations } = useContext(ServiceContext);
  const transcriptItems = transcript?.model?.blocks;
  if (!transcriptItems) {
    return null;
  }

  const { transcript: transcriptTranslations = DEAFULT_TRANSLATIONS } =
    translations;
  const { readTranscript, disclaimer } = transcriptTranslations;

  const formattedTitle = title ? `, ${title}` : '';

  return (
    <details css={styles.details}>
      <summary css={styles.summary}>
        <ArrowSvg />
        <span role="text">
          {/* TO DO - add translations */}
          <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
            {readTranscript}
          </Text>
          {title && <VisuallyHiddenText>{formattedTitle}</VisuallyHiddenText>}
        </span>
      </summary>
      <Text size="brevier" css={styles.disclaimer} as="small">
        {disclaimer}
      </Text>
      <ul css={styles.ul} role="list">
        {transcriptItems.map(item => (
          <TranscriptListItem
            key={item.id}
            id={item.id}
            start={item.start}
            content={item.content}
          />
        ))}
      </ul>
    </details>
  );
};

export default Transcript;
