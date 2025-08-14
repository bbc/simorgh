/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import isLive from '#app/lib/utilities/isLive';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
import styles from './index.styles';

type ReadTimeProps = {
  readTime?: number;
  className?: string;
  readTimeVariant?: string;
  readTimeLocation?: string;
};

const ReadTime = ({ readTime, readTimeVariant, className }: ReadTimeProps) => {
  if (!readTime) return null;
  if (isLive() || readTimeVariant === 'off' || !readTimeVariant) return null;

  const { translations } = use(ServiceContext);
  const readTimeTranslation = translations.readTime || 'Estimated Read Time';

  // EXPERIMENT: Read Time
  const fontSize = readTimeVariant.includes('bold') ? 'pica' : 'brevier';
  const fontVariant = readTimeVariant.includes('bold')
    ? 'sansBold'
    : 'sansRegular';
  const readTimeCopyType = readTimeVariant.includes('minutes')
    ? 'minutes'
    : 'quickLong';

  const readTimeInMiliseconds = readTime * 60000;
  const minutesLabel = readTime === 1 ? 'minute' : 'minutes';
  const quickLongCopy = readTime < 5 ? 'Quick' : 'Long';
  const minutesCopy = `${readTimeTranslation}: ${readTime} ${minutesLabel}`;

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time-on-article',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_article_read_time',
    experimentVariant: readTimeVariant,
    itemTracker: {
      label: `Read time: ${readTime} ${minutesLabel}`,
      duration: readTimeInMiliseconds,
      type: `read-time`,
    },
  };

  // Can remove disable-next-line when we remove isLive check
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);

  return (
    <div
      className={className}
      css={styles.readTimeContainer}
      {...viewRef}
      data-testid="read-time"
    >
      <Text size={fontSize} fontVariant={fontVariant} css={styles.readTimeText}>
        {readTimeCopyType === 'minutes' ? minutesCopy : quickLongCopy}
      </Text>
    </div>
  );
};

export default ReadTime;
