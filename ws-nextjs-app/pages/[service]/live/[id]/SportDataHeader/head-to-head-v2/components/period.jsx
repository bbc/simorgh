// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
// import { css } from '@emotion/react';

// import {
//   SPACING_1,
//   fontScaleBody,
//   fontScaleDescription,
// } from '@bbc/web-gel-foundations';
// import { getFallbackFootballPeriodLabel } from '@bbc/web-sport-utils';
// import { getStyledMatchProgress } from '../helpers/colour-styles.js';

import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';

const StyledPeriod = styled.div`
  display: flex;
  justify-content: center;
  ${
    '' /* color: ${({ status, theme, isConciseView }) =>
    getStyledMatchProgress({ status, theme, isConciseView })}; */
  }
  ${'' /* ${fontScaleBody} */}
  color: '#FFD230';
  font-size: 1rem;
  line-height: 1.375;

  ${
    '' /* ${({ isConciseView }) =>
    isConciseView &&
    css`
      padding-top: ${SPACING_1};
      ${fontScaleDescription}
    `} */
  }
`;

const Period = ({
  labels,
  status,
  homeRunningScores,
  awayRunningScores,
  isConciseView,
}) => {
  const period = getFallbackFootballPeriodLabel(
    labels,
    status,
    homeRunningScores,
    awayRunningScores,
  );
  return (
    <StyledPeriod
      aria-hidden="true"
      status={status}
      isConciseView={isConciseView}
    >
      <div>{period.value}</div>
    </StyledPeriod>
  );
};

export default Period;
