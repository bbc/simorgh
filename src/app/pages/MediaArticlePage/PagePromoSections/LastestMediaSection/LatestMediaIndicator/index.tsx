/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { LatestMediaIndicatorProp } from '../LatestMediaTypes';

import { StyledPromoMediaIndicator, StyledTime, styles } from './index.styles';

const formatChildren = (duration: string) => {
  if (!duration) return null;
  const momentDuration = moment.duration(duration, 'seconds');
  const durationString = formatDuration({ duration: momentDuration });
  const isoDuration = momentDuration.toISOString();
  return (
    <StyledTime dateTime={isoDuration} suppressHydrationWarning>
      {durationString}
    </StyledTime>
  );
};

const LatestMediaIndicator = ({ duration }: LatestMediaIndicatorProp) => {
  return (
    <div css={styles.placeholderInfo} aria-hidden>
      <StyledPromoMediaIndicator />
      {formatChildren(duration)}
    </div>
  );
};

export default LatestMediaIndicator;
