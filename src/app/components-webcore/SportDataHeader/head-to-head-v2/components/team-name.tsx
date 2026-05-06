// import React from 'react';
// import {
//   createSize,
//   fontScaleBody,
//   fontScaleDescription,
//   fontScaleIndexHeadlineMedium,
//   GROUP_3,
//   GROUP_4,
//   SPACING_2
// } from '@bbc/web-gel-foundations';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

// import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

const TeamNameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  ${
    '' /* ${({ shouldHideBadges }) =>
    shouldHideBadges ? fontScaleIndexHeadlineMedium : fontScaleBody} */
  }
  font-size: 1rem;
  line-height: 1.375;
  padding: ${({ shouldHideBadges }) =>
    shouldHideBadges ? '0 8px' : '0 0 8px'};

  @media (min-width: ${pixelsToRem(600)}rem) {
    padding: 0;
    ${'' /* ${fontScaleIndexHeadlineMedium} */}
    font-size: 1.25rem;
    line-height: 1.2;

    @media (min-width: ${pixelsToRem(600)}rem) {
      font-size: 1.5rem;
      line-height: 1.1666666666666667;
    }
  }

  ${({ isConciseView }) =>
    isConciseView &&
    css`
      ${'' /* ${fixedHeightConciseView} */}
      ${'' /* ${fontScaleDescription} */}
      font-size: 14px;
      line-height: 1.2857142857142858;
      padding: 0;

      @media (min-width: ${pixelsToRem(600)}rem) {
        font-size: ${pixelsToRem(16)}rem;
        line-height: 1.375;
      }
    `}
`;

const MobileValue = styled.span`
  @media (min-width: ${pixelsToRem(900)}rem) {
    display: none;
  }
`;

const DesktopValue = styled.span`
  display: none;
  @media (min-width: ${pixelsToRem(900)}rem) {
    display: inline;
  }
`;

interface TeamNameProps {
  fullName: string;
  shortName: string;
  isConciseView?: boolean;
  shouldHideBadges?: boolean;
}

const TeamName = ({
  fullName,
  shortName,
  isConciseView,
  shouldHideBadges,
}: TeamNameProps) => (
  <div css={styles.teamNameWrapper(isConciseView, shouldHideBadges)}>
    <span css={styles.mobileValue()} aria-hidden="true">
      {shortName}
    </span>
    <span css={styles.desktopValue()} aria-hidden="true">
      {fullName}
    </span>
    <VisuallyHiddenText>
      {fullName === 'TBC' ? 'Team to be confirmed' : fullName}
    </VisuallyHiddenText>
  </TeamNameWrapper>
);

export default TeamName;
