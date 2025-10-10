/** @jsx jsx */
/* eslint-disable jsx-a11y/aria-role */
import { ServiceContext } from '#app/contexts/ServiceContext';
import { jsx } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { use } from 'react';
import Text from '../Text';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { RightArrow as ArrowSvg } from '../icons';
import TranscriptTimestamp from './TranscriptTimestamp';
import styles from './index.styles';
import { TranscriptBlock, TranscriptItem } from './types';

const DEFAULT_TRANSLATIONS = {
  readTranscript: 'Read transcript',
  disclaimer:
    'This transcript has been reviewed by a journalist, it was generated with AI (Artificial Intelligence).',
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
  const eventTrackingData: EventTrackingData = {
    componentName: 'Transcript',
  };

  const formatEventTrackingData = ({
    eventName,
    viewThreshold,
  }: {
    eventName: string;
    viewThreshold?: number;
  }) => {
    return {
      ...eventTrackingData,
      ...(viewThreshold && { viewThreshold }),
      itemTracker: {
        type: `transcript-${eventName}`,
      },
    };
  };

  const viewTrackerForDefaultState = useViewTracker(
    formatEventTrackingData({ eventName: 'default-state' }),
  );

  const viewTrackerForOpenTranscript = useViewTracker(
    formatEventTrackingData({
      eventName: 'open',
      viewThreshold: 0.2,
    }),
  );

  const viewTrackerForTranscriptEnd = useViewTracker(
    formatEventTrackingData({ eventName: 'end' }),
  );

  const { onClick: clickTrackerHandler } = useClickTrackerHandler(
    formatEventTrackingData({ eventName: 'default-state' }),
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (clickTrackerHandler) clickTrackerHandler(event);

    event.preventDefault();

    // Manually toggle the <details> element since click handler prevents this on first click
    const summary = event.currentTarget;
    const details = summary.closest('details');

    if (details) {
      details.open = !details.open;
    }
  };

  const { translations } = use(ServiceContext);
  const transcriptItems = transcript?.model?.blocks;
  if (!transcriptItems) {
    return null;
  }

  const { transcript: transcriptTranslations = DEFAULT_TRANSLATIONS } =
    translations;
  const { readTranscript, disclaimer } = transcriptTranslations;

  const formattedTitle = title ? `, ${title}` : '';

  return (
    <details css={styles.details}>
      <summary
        css={styles.summary}
        onClick={handleClick}
        {...viewTrackerForDefaultState}
      >
        <ArrowSvg />
        <span role="text">
          <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
            {readTranscript}
          </Text>
          {title && <VisuallyHiddenText>{formattedTitle}</VisuallyHiddenText>}
        </span>
      </summary>
      <Text size="brevier" css={styles.disclaimer} as="small">
        {disclaimer}
      </Text>
      <ul css={styles.ul} role="list" {...viewTrackerForOpenTranscript}>
        {transcriptItems.map(item => (
          <TranscriptListItem
            key={item.id}
            id={item.id}
            start={item.start}
            content={item.content}
          />
        ))}
      </ul>
      <img
        {...viewTrackerForTranscriptEnd}
        height="1px"
        width="1px"
        alt=""
        style={{ position: 'absolute' }}
        aria-hidden="true"
      />
    </details>
  );
};

export default Transcript;
