/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue: number;
  className?: string;
  readTimeVariant?: string;
  promoId?: string;
  displayBlock?: boolean;
};

const DEFAULT_TRANSLATIONS = {
  readTimePrefix: 'Estimated Read Time',
  quick: 'Quick Read',
  long: 'Long Read',
  minute: 'minute',
  minutes: 'minutes',
};

const ReadTime = ({
  readTimeValue,
  readTimeVariant,
  promoId,
  displayBlock,
  className,
}: ReadTimeProps) => {
  const showReadTime = readTimeVariant && readTimeVariant !== 'off';
  if (!showReadTime) return null;

  const { translations } = use(ServiceContext);
  const readTimePrefix =
    translations.readTime?.readTimePrefix ??
    DEFAULT_TRANSLATIONS.readTimePrefix;
  const quickCopy = translations.readTime?.quick ?? DEFAULT_TRANSLATIONS.quick;
  const longCopy = translations.readTime?.long ?? DEFAULT_TRANSLATIONS.long;
  const singleMinuteSuffix =
    translations.readTime?.minute ?? DEFAULT_TRANSLATIONS.minute;
  const minutesSuffix =
    translations.readTime?.minutes ?? DEFAULT_TRANSLATIONS.minutes;

  // EXPERIMENT: Read Time
  const fontSize = readTimeVariant.includes('bold') ? 'pica' : 'brevier';
  const fontVariant = readTimeVariant.includes('bold')
    ? 'sansBold'
    : 'sansRegular';
  const readTimeCopyType = readTimeVariant.includes('minutes')
    ? 'minutes'
    : 'quickLong';

  const readTimeInMiliseconds = readTimeValue * 60000;
  const minutesLabel = readTimeValue === 1 ? singleMinuteSuffix : minutesSuffix;
  const quickLongCopy = readTimeValue < 5 ? quickCopy : longCopy;
  const minutesCopy = `${readTimePrefix}: ${readTimeValue} ${minutesLabel}`;

  const eventTrackingData: EventTrackingData = {
    // changed - only push once experiment is concluded - determine if this needs to be unique
    componentName: 'read-time',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_article_read_time',
    experimentVariant: readTimeVariant,
    itemTracker: {
      label: `Read time: ${readTimeValue} ${minutesLabel}`,
      duration: readTimeInMiliseconds,
      type: 'read-time',
      resourceId: promoId,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);

  const isControlVariant = readTimeVariant === 'control';

  if (isControlVariant)
    return <div {...viewRef} css={styles.readTimePlaceholderControl} />;

  return (
    <div
      className={className}
      css={[
        styles.readTimeContainer,
        !displayBlock && styles.readTimeInlineStyles,
      ]}
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
