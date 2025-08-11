/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import isLive from '#app/lib/utilities/isLive';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import styles from './index.styles';

type ReadTimeProps = {
  readTime: number;
  className?: string;
  readTimeVariant?: string;
};

const ReadTime = ({ readTime, readTimeVariant, className }: ReadTimeProps) => {
  if (isLive() || readTimeVariant === 'off') return null;

  const readTimeInMiliseconds = readTime * 60000;
  const minutesLabel = readTime === 1 ? 'minute' : 'minutes';

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

  const { translations } = use(ServiceContext);
  const readTimeTranslation = translations.readTime || 'Estimated Read Time';

  return (
    <div
      className={className}
      css={styles.readTime}
      {...viewRef}
      data-testid="read-time"
    >
      <p>
        {readTimeTranslation}: {readTime} {minutesLabel}
      </p>
      <p>Experiment Variant: {readTimeVariant}</p>
    </div>
  );
};

export default ReadTime;
