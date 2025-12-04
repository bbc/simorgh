import type { PropsWithChildren } from 'react';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue?: number;
  className?: string;
  readTimeVariant?: string | null;
  promoId?: string;
  promoType?: string;
  promoPosition?: number;
};

const DEFAULT_TRANSLATIONS = {
  long: 'Long read',
  minute: 'min',
  read: 'Read time',
};

const ProcessReadTime = ({
  readTimeValue,
  readTimeVariant,
}: {
  readTimeValue: number;
  readTimeVariant: string;
}) => {
  const { translations, service } = use(ServiceContext);

  const singleMinuteSuffix =
    translations.readTime?.minute ?? DEFAULT_TRANSLATIONS.minute;
  const readCopy =
    translations.readTime?.readTimePrefix ?? DEFAULT_TRANSLATIONS.read;

  const servicesWithMinutesBeforeNumber = [
    'hausa',
    'igbo',
    'yoruba',
    'swahili',
  ];
  const servicesWithoutColon = ['igbo', 'pidgin'];

  const separator = servicesWithoutColon.includes(service) ? ' ' : ': ';

  let copy = servicesWithMinutesBeforeNumber.includes(service)
    ? `${readCopy}${separator}${singleMinuteSuffix} ${readTimeValue}`
    : `${readCopy}${separator}${readTimeValue} ${singleMinuteSuffix}`;

  const isLongRead = readTimeValue >= 6;
  if (readTimeVariant === 'long_read_written' && isLongRead) {
    copy = translations.readTime?.long ?? DEFAULT_TRANSLATIONS.long;
  }

  const readTimeInMilliseconds = readTimeValue * 60000;

  return {
    readTimeInMilliseconds,
    minutesLabel: DEFAULT_TRANSLATIONS.minute,
    copy,
  };
};

// EXPERIMENT: Article Read Time 2
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

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time-on-article',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_article_read_time_2',
    experimentVariant: readTimeVariant,
    itemTracker: {
      label: `Read time: ${readTimeValue} ${minutesLabel}`,
      duration: readTimeInMilliseconds,
      type: `read-time`,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);
  if (readTimeVariant === 'control')
    return <div {...viewRef} css={styles.readTimePlaceholderControl} />;

  return (
    <div
      className={className}
      css={styles.readTimeContainer}
      {...viewRef}
      data-testid="read-time"
    >
      <Text css={styles.readTimeText} size="brevier">
        {copy}
      </Text>
    </div>
  );
};

// EXPERIMENT - Placeholder for control variants
const HomepagePlaceholder = (props: PropsWithChildren) => (
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
  promoType,
  promoPosition,
  className,
}: ReadTimeProps) => {
  const { service } = use(ServiceContext);

  const validRender = [
    readTimeValue,
    readTimeVariant,
    readTimeVariant !== 'off',
  ].every(Boolean);

  // EXPERIMENT: Homepage Read Time
  const experimentEnabledServices = ['turkce', 'mundo'];

  if (readTimeVariant === null && experimentEnabledServices.includes(service))
    return <HomepagePlaceholder />;

  if (!validRender) return null;

  const { readTimeInMilliseconds, copy } = ProcessReadTime({
    readTimeValue: readTimeValue as number,
    readTimeVariant: readTimeVariant as string,
  });

  const optimizelyTrackingData: EventTrackingData = {
    componentName: 'read-time',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_homepage_read_time',
    experimentVariant: readTimeVariant,
  };

  const eventTrackingData: EventTrackingData = {
    ...optimizelyTrackingData,
    itemTracker: {
      type: promoType,
      position: promoPosition,
      label: `Read time: ${readTimeValue} ${readTimeValue === 1 ? 'minute' : 'minutes'}`,
      duration: readTimeInMilliseconds,
      resourceId: promoId,
    },
  };

  const isControlVariant = readTimeVariant === 'control';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewRef = useViewTracker(eventTrackingData);

  if (isControlVariant) return <HomepagePlaceholder {...viewRef} />;

  return (
    <div className={className} data-testid="read-time" {...viewRef}>
      <Text css={styles.readTimeText} size="brevier">
        {copy}
      </Text>
    </div>
  );
};
