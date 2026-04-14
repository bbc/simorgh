import React from 'react';
import {
  createSize,
  fontScaleBody,
  fontScaleDescription,
  fontScaleIndexHeadlineMedium,
  GROUP_3,
  GROUP_4,
  SPACING_2
} from '@bbc/web-gel-foundations';
import styled, { css } from '@bbc/web-styled';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

const TeamNameWrapper = styled.div`
  display: flex;
  gap: ${SPACING_2};
  align-items: center;
  ${({ shouldHideBadges }) => (shouldHideBadges ? fontScaleIndexHeadlineMedium : fontScaleBody)}
  padding: ${({ shouldHideBadges }) => (shouldHideBadges ? `0 ${SPACING_2}` : `0 0 ${SPACING_2}`)};

  @media (min-width: ${GROUP_3}) {
    padding: 0;
    ${fontScaleIndexHeadlineMedium}
  }

  ${({ isConciseView }) =>
    isConciseView &&
    css`
      ${fixedHeightConciseView}
      ${fontScaleDescription}
      padding: 0;

      @media (min-width: ${GROUP_3}) {
        font-size: ${createSize(16)};
        line-height: 1.375;
      }
    `}
`;

const MobileValue = styled.span`
  @media (min-width: ${GROUP_4}) {
    display: none;
  }
`;

const DesktopValue = styled.span`
  display: none;
  @media (min-width: ${GROUP_4}) {
    display: inline;
  }
`;

const TeamName = ({ fullName, shortName, isConciseView, shouldHideBadges }) => (
  <TeamNameWrapper isConciseView={isConciseView} shouldHideBadges={shouldHideBadges}>
    <MobileValue aria-hidden="true">{shortName}</MobileValue>
    <DesktopValue aria-hidden="true">{fullName}</DesktopValue>
    <VisuallyHidden>{fullName === 'TBC' ? 'Team to be confirmed' : fullName}</VisuallyHidden>
  </TeamNameWrapper>
);

export default TeamName;
