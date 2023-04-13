/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { LatestMediaIndicatorProp } from '../LatestMediaTypes';

import { StyledPromoMediaIndicator, styles } from './index.styles';

const LatestMediaIndicator = ({ duration }: LatestMediaIndicatorProp) => {
  const momentDuration = moment.duration(duration, 'seconds');
  const durationString = formatDuration({ duration: momentDuration });
  const isoDuration = momentDuration.toISOString();
  return (
    <div css={styles.placeholderInfo}>
      <StyledPromoMediaIndicator />
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
