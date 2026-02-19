import { use } from 'react';
import moment from 'moment';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
import { formatDuration } from '#app/legacy/psammead/psammead-timestamp-container/src/utilities';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue: number;
  className?: string;
};

const formatReadTime = ({
  readTimeValue,
  singleMinuteSuffix,
  readTimePrefix,
  service,
  datetimeLocale,
}: {
  readTimeValue: number;
  singleMinuteSuffix?: string;
  readTimePrefix?: string;
  service: Services;
  datetimeLocale: string;
}) => {
  if (!singleMinuteSuffix || !readTimePrefix) return null;

  const servicesWithMinutesBeforeNumber: Services[] = [
    'afaanoromoo',
    'burmese',
    'hausa',
    'gahuza',
    'igbo',
    'swahili',
    'sinhala',
    'yoruba',
  ];
  const servicesWithoutColon: Services[] = [
    'igbo',
    'pidgin',
    'turkce',
    'japanese',
  ];

  const separator = servicesWithoutColon.includes(service) ? ' ' : ': ';

  const translatedReadTime = formatDuration({
    duration: moment.duration(readTimeValue, 'minutes').toISOString(),
    format: 'm',
    locale: datetimeLocale,
  });

  return servicesWithMinutesBeforeNumber.includes(service)
    ? `${readTimePrefix}${separator}${singleMinuteSuffix} ${translatedReadTime}`
    : `${readTimePrefix}${separator}${translatedReadTime} ${singleMinuteSuffix}`;
};

const ReadTimeArticle = ({ readTimeValue, className }: ReadTimeProps) => {
  const { datetimeLocale, translations, service } = use(ServiceContext);

  const { readTime } = translations;
  const singleMinuteSuffix = readTime?.minute;
  const readTimePrefix = readTime?.readTimePrefix;

  const readTimeInMilliseconds = readTimeValue * 60000;

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time-on-article',
    itemTracker: {
      label: `Read time: ${readTimeValue} min`,
      duration: readTimeInMilliseconds,
      type: `read-time`,
    },
  };

  const viewRef = useViewTracker(eventTrackingData);

  const readTimeText = formatReadTime({
    readTimeValue,
    singleMinuteSuffix,
    readTimePrefix,
    service,
    datetimeLocale,
  });

  if (!readTimeText) return null;

  return (
    <div
      className={className}
      css={styles.readTimeContainer}
      {...viewRef}
      data-testid="read-time"
    >
      <Text css={styles.readTimeText} size="brevier">
        {readTimeText}
      </Text>
    </div>
  );
};

export default ReadTimeArticle;
