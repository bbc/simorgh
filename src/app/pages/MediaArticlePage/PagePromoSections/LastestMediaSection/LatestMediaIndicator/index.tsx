/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import { LatestMediaIndicatorProp } from '../LatestMediaTypes';

import { StyledPromoMediaIndicator, StyledTime, styles } from './index.styles';

const formatChildren = (children: string) => {
  if (!children) return null;
  const duration = moment.duration(children, 'seconds');
  const durationString = formatDuration({ duration });
  const isoDuration = duration.toISOString();
  return (
    <StyledTime dateTime={isoDuration} suppressHydrationWarning>
      {durationString}
    </StyledTime>
  );
};

const LatestMediaIndicator = ({ children }: LatestMediaIndicatorProp) => {
  return (
    <div css={styles.placeholderInfo}>
      <StyledPromoMediaIndicator />
      {formatChildren(children)}
    </div>
  );
};

export default LatestMediaIndicator;
