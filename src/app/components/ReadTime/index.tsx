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
  readTimeValue?: number;
  className?: string;
  readTimeVariant?: string | null;
  promoId?: string;
};

const DEFAULT_TRANSLATIONS = {
  readTimePrefix: 'Estimated Read Time',
  quick: 'Quick Read',
  long: 'Long Read',
  minute: 'minute',
  minutes: 'minutes',
};

const ProcessReadTime = ({
  readTimeValue,
  readTimeVariant,
}: {
  readTimeValue: number;
  readTimeVariant: string;
}) => {
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

  const readTimeInMilliseconds = readTimeValue * 60000;
  const minutesLabel = readTimeValue === 1 ? singleMinuteSuffix : minutesSuffix;
  const quickLongCopy = readTimeValue < 5 ? quickCopy : longCopy;
  const minutesCopy = `${readTimePrefix}: ${readTimeValue} ${minutesLabel}`;

  const readTimeCopyType = readTimeVariant.includes('minutes')
    ? 'minutes'
    : 'quickLong';

  const copy = readTimeCopyType === 'minutes' ? minutesCopy : quickLongCopy;

  return {
    readTimeInMilliseconds,
    minutesLabel,
    copy,
  };
};

export const ReadTimeArticleExperiment = ({
  readTimeValue,
  readTimeVariant,
  className,
}: ReadTimeProps) => {
  if (!readTimeValue) return null;
  const showReadTime = readTimeVariant && readTimeVariant !== 'off';
  if (!showReadTime) return null;

  const { readTimeInMilliseconds, minutesLabel, copy } = ProcessReadTime({
    readTimeValue,
    readTimeVariant,
  });

  // EXPERIMENT: Read Time
  const fontSize = readTimeVariant.includes('bold') ? 'pica' : 'brevier';
  const fontVariant = readTimeVariant.includes('bold')
    ? 'sansBold'
    : 'sansRegular';

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
        {copy}
      </Text>
    </div>
  );
};

// EXPERIMENT - Placeholder for control variants
const HomepagePlaceholder = (props: React.PropsWithChildren) => (
  <div
    {...props}
    css={styles.readTimeHomepagePlaceholderControl}
    className="placeholder"
  />
);

export const ReadTime = ({
  readTimeValue,
  readTimeVariant,
  promoId,
  className,
}: ReadTimeProps) => {
  const { service } = use(ServiceContext);

  const validRender = [
    !isLive(),
    readTimeValue,
    readTimeVariant,
    readTimeVariant !== 'off',
  ].every(Boolean);

  const experimentEnabledServices = ['turkce', 'mundo'];

  if (readTimeVariant === null && experimentEnabledServices.includes(service))
    return <HomepagePlaceholder />;

  if (!validRender) return null;

  const { readTimeInMilliseconds, minutesLabel, copy } = ProcessReadTime({
    readTimeValue: readTimeValue as number,
    readTimeVariant: readTimeVariant as string,
  });

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_homepage_read_time',
    experimentVariant: readTimeVariant,
    itemTracker: {
      label: `Read time: ${readTimeValue} ${minutesLabel}`,
      duration: readTimeInMilliseconds,
      resourceId: promoId,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);

  const isControlVariant = readTimeVariant === 'control';

  if (isControlVariant) return <HomepagePlaceholder {...viewRef} />;

  return (
    <div className={className} data-testid="read-time" {...viewRef}>
      <Text css={styles.readTimeText} size="brevier">
        {copy}
      </Text>
    </div>
  );
};
