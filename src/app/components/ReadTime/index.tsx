/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import isLive from '#app/lib/utilities/isLive';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';

type ReadTimeProps = {
  readTime?: number;
  className?: string;
};

const ReadTime = ({ readTime, className }: ReadTimeProps) => {
  if (!readTime || isLive()) return null;

  const experimentName = 'dummy_experiment_mvt';
  const experimentVariant = useOptimizelyVariation({
    experimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const readTimeInMiliseconds = readTime * 60000;
  const minutesLabel = readTime === 1 ? 'minute' : 'minutes';

  const eventTrackingData: EventTrackingData = {
    componentName: 'read-time-on-article',
    sendOptimizelyEvents: true,
    experimentName: 'dummy_experiment_mvt',
    experimentVariant: experimentVariant,
    itemTracker: {
      text: `Read time: ${readTime.toString()} ${minutesLabel}`,
      duration: readTimeInMiliseconds,
    },
  };

  const viewRef = useViewTracker(eventTrackingData);

  const { translations } = use(ServiceContext);
  const readTimeTranslation = translations.readTime || 'Estimated Read Time';

  return (
    <div className={className} css={styles.readTime} {...viewRef}>
      <p>
        {readTimeTranslation}: {readTime} {minutesLabel}
      </p>
      <p>
        Experiment Variant: {experimentVariant}, {readTimeInMiliseconds}
      </p>
    </div>
  );
};

export default ReadTime;
