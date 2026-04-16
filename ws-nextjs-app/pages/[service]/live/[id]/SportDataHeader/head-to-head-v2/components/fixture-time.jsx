// import React from 'react';
// import styled, { css } from '@bbc/web-styled';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';

// import {
//   GROUP_3,
//   SPACING_1,
//   SPACING_3,
//   SPACING_4,
//   SPACING_7,
//   createSize,
//   fontScaleBody,
//   fontScaleIndexHeadlineMedium,
//   fontScaleSectionHeading,
//   fontStandard,
//   // eslint-disable-next-line no-restricted-imports
//   fontWeights
// } from '@bbc/web-gel-foundations';
// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
// import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../../../../../src/app/components/VisuallyHiddenText';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const StyledTime = styled.time`
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* ${fontScaleBody} */}
  font-size: 16px;
  line-height: 1.375;

  font-size: ${pixelsToRem(40)}rem;
  line-height: 1.125;
  font-weight: 500;
  padding: 0 4px;

  @media (min-width: ${pixelsToRem(600)}rem) {
    font-size: ${pixelsToRem(50)}rem;
    line-height: 1.08;
    padding: 0 32px;
  }

  ${
    '' /* ${({ theme, isConciseView }) =>
    isConciseView &&
    css`
      ${fontStandard({ theme })}
      ${fixedHeightConciseView}
      ${fontScaleIndexHeadlineMedium}
      padding: 0 12px;

      @media (min-width: '${pixelsToRem(600)}rem') {
        padding: 0 16px;
        ${fontScaleSectionHeading}
      }
    `} */
  }
`;

const Time = ({ time, isConciseView }) => (
  <>
    <StyledTime aria-hidden="true" isConciseView={isConciseView}>
      {time.displayTimeUK}
    </StyledTime>
    <VisuallyHiddenText>{time.accessibleTime}</VisuallyHiddenText>
  </>
);

export default Time;
