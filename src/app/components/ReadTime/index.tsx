/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import isLive from '#app/lib/utilities/isLive';
import Text from '#app/components/Text';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue: number;
  className?: string;
  readTimeVariant?: string;
  promoId?: string;
};

const DEFAULT_TRANSLATIONS = {
  readTimePrefix: 'Estimated Read Time',
  quick: 'Quick Read',
  long: 'Long Read',
  minute: 'minute',
  minutes: 'minutes',
};

const GetTranslations = () => {
  const { translations } = use(ServiceContext);
  return translations;
};

const processReadTime = (readTimeValue: number) => {
  const translations = GetTranslations();
  const readTimePrefix =
    translations.readTime?.readTimePrefix ??
    DEFAULT_TRANSLATIONS.readTimePrefix;
  const quickCopy = translations.readTime?.quick ?? DEFAULT_TRANSLATIONS.quick;
  const longCopy = translations.readTime?.long ?? DEFAULT_TRANSLATIONS.long;
  const singleMinuteSuffix =
    translations.readTime?.minute ?? DEFAULT_TRANSLATIONS.minute;
  const minutesSuffix =
    translations.readTime?.minutes ?? DEFAULT_TRANSLATIONS.minutes;

  const readTimeInMilliseconds = readTimeValue * 60000;
  const minutesLabel = readTimeValue === 1 ? singleMinuteSuffix : minutesSuffix;
  const quickLongCopy = readTimeValue < 5 ? quickCopy : longCopy;
  const minutesCopy = `${readTimePrefix}: ${readTimeValue} ${minutesLabel}`;

  return {
    readTimeInMilliseconds,
    minutesLabel,
    quickLongCopy,
    minutesCopy,
  };
};

export const ReadTimeArticle = ({
  readTimeValue,
  readTimeVariant,
  className,
}: ReadTimeProps) => {
  const showReadTime = readTimeVariant && readTimeVariant !== 'off';
  if (!showReadTime) return null;

  const { readTimeInMilliseconds, minutesLabel, quickLongCopy, minutesCopy } =
    processReadTime(readTimeValue);

  // EXPERIMENT: Read Time
  const fontSize = readTimeVariant.includes('bold') ? 'pica' : 'brevier';
  const fontVariant = readTimeVariant.includes('bold')
    ? 'sansBold'
    : 'sansRegular';
  const readTimeCopyType = readTimeVariant.includes('minutes')
    ? 'minutes'
    : 'quickLong';

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time-on-article',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_article_read_time',
    experimentVariant: readTimeVariant,
    itemTracker: {
      label: `Read time: ${readTimeValue} ${minutesLabel}`,
      duration: readTimeInMilliseconds,
      type: `read-time`,
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

export const ReadTimeHomepage = ({
  readTimeValue,
  promoId,
  className,
}: ReadTimeProps) => {
  if (isLive()) return null;

  const { readTimeInMilliseconds, minutesLabel, minutesCopy } =
    processReadTime(readTimeValue);

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time',
    itemTracker: {
      label: `Read time: ${readTimeValue} ${minutesLabel}`,
      duration: readTimeInMilliseconds,
      resourceId: promoId,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);

  return (
    <span className={className} data-testid="read-time" {...viewRef}>
      <Text css={styles.readTimeText} size="brevier">
        {minutesCopy}
      </Text>
    </span>
  );
};
