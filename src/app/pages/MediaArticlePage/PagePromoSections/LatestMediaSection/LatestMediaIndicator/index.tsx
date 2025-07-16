import moment from 'moment';

import Promo from '../../../../../legacy/components/OptimoPromos';
import formatDuration from '../../../../../lib/utilities/formatDuration';
import { LatestMediaIndicatorProp } from '../types';
import styles from './index.styles';

const LatestMediaIndicator = ({ duration }: LatestMediaIndicatorProp) => {
  const momentDuration = moment.duration(duration, 'seconds');
  const durationString = formatDuration({ duration: momentDuration });
  const isoDuration = momentDuration.toISOString();

  return (
    <div className={styles.placeholderInfo(false)}>
      <Promo.MediaIndicator className={styles.promoMediaIndicator(false)} />
      {duration ? (
        <time
          dateTime={isoDuration}
          suppressHydrationWarning
          aria-hidden
          className={styles.time(false)}
        >
          {durationString}
        </time>
      ) : null}
    </div>
  );
};

export default LatestMediaIndicator;
