import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '#app/components/Text';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue: number;
  className?: string;
  readTimeVariant?: string | null;
  promoId?: string;
  promoType?: string;
  promoPosition?: number;
};

const ProcessReadTime = ({ readTimeValue }: { readTimeValue: number }) => {
  const { translations, service } = use(ServiceContext);

  const singleMinuteSuffix = translations.readTime?.minute;
  const readCopy = translations.readTime?.readTimePrefix;
  const longReadCopy = translations.readTime?.long;

  if (!singleMinuteSuffix || !readCopy || !longReadCopy) return null;

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
  if (isLongRead) {
    copy = longReadCopy;
  }

  return {
    copy,
  };
};

const ReadTimeArticle = ({ readTimeValue, className }: ReadTimeProps) => {
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

  const { copy } =
    ProcessReadTime({
      readTimeValue,
    }) || {};

  if (!readTimeInMilliseconds || !copy) return null;

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

export default ReadTimeArticle;
