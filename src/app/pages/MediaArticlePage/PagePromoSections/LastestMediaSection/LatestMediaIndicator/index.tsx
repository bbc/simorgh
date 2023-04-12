/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { LatestMediaIndicatorProp } from '../LatestMediaTypes';

import { StyledPromoMediaIndicator, styles } from './index.styles';

const formatChildren = (duration: string) => {
  if (!duration) return null;
  const momentDuration = moment.duration(duration, 'seconds');
  const durationString = formatDuration({ duration: momentDuration });
  const isoDuration = momentDuration.toISOString();
  return (
    <time
      dateTime={isoDuration}
      suppressHydrationWarning
      aria-hidden
      css={styles.time}
    >
      {durationString}
    </time>
  );
};

const LatestMediaIndicator = ({ duration }: LatestMediaIndicatorProp) => {
  return (
    <div css={styles.placeholderInfo}>
      <StyledPromoMediaIndicator />
      {formatChildren(duration)}
    </div>
  );
};

export default LatestMediaIndicator;
