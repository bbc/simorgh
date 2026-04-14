import React from 'react';
import styled, { css } from '@bbc/web-styled';
import {
  GROUP_3,
  SPACING_1,
  SPACING_3,
  SPACING_4,
  SPACING_7,
  createSize,
  fontScaleBody,
  fontScaleIndexHeadlineMedium,
  fontScaleSectionHeading,
  fontStandard,
  // eslint-disable-next-line no-restricted-imports
  fontWeights
} from '@bbc/web-gel-foundations';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

const StyledTime = styled.time`
  display: flex;
  align-items: center;
  justify-content: center;
  ${fontScaleBody}
  font-size: ${createSize(40)};
  line-height: 1.125;
  font-weight: ${fontWeights.medium};
  padding: 0 ${SPACING_1};

  @media (min-width: ${GROUP_3}) {
    font-size: ${createSize(50)};
    line-height: 1.08;
    padding: 0 ${SPACING_7};
  }

  ${({ theme, isConciseView }) =>
    isConciseView &&
    css`
      ${fontStandard({ theme })}
      ${fixedHeightConciseView}
      ${fontScaleIndexHeadlineMedium}
      padding: 0 ${SPACING_3};

      @media (min-width: ${GROUP_3}) {
        padding: 0 ${SPACING_4};
        ${fontScaleSectionHeading}
      }
    `}
`;

const Time = ({ time, isConciseView }) => (
  <>
    <StyledTime aria-hidden="true" isConciseView={isConciseView}>
      {time.displayTimeUK}
    </StyledTime>
    <VisuallyHidden>{time.accessibleTime}</VisuallyHidden>
  </>
);

export default Time;
