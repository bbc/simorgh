/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import Promo from '#components/OptimoPromos';
import { LatestMediaIndicatorProp } from '../types';
import styles from './index.styles';

const LatestMediaIndicator = ({ duration }: LatestMediaIndicatorProp) => {
  const momentDuration = moment.duration(duration, 'seconds');
  const durationString = formatDuration({ duration: momentDuration });
  const isoDuration = momentDuration.toISOString();

  return (
    <div css={styles.placeholderInfo}>
      <Promo.MediaIndicator css={styles.promoMediaIndicator} />
      {duration ? (
        <time
          dateTime={isoDuration}
          suppressHydrationWarning
          aria-hidden
          css={styles.time}
        >
          {durationString}
        </time>
      ) : null}
    </div>
  );
};

export default LatestMediaIndicator;
