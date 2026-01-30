import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
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
}: {
  readTimeValue: number;
  singleMinuteSuffix?: string;
  readTimePrefix?: string;
  service: Services;
}) => {
  if (!singleMinuteSuffix || !readTimePrefix) return null;

  const servicesWithMinutesBeforeNumber: Services[] = [
    'hausa',
    'igbo',
    'yoruba',
    'swahili',
  ];
  const servicesWithoutColon: Services[] = ['igbo', 'pidgin'];

  const separator = servicesWithoutColon.includes(service) ? ' ' : ': ';

  return servicesWithMinutesBeforeNumber.includes(service)
    ? `${readTimePrefix}${separator}${singleMinuteSuffix} ${readTimeValue}`
    : `${readTimePrefix}${separator}${readTimeValue} ${singleMinuteSuffix}`;
};

const ReadTimeArticle = ({ readTimeValue, className }: ReadTimeProps) => {
  const { translations, service } = use(ServiceContext);

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
