// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled, { css } from '@emotion/styled';

// import {
//   /GROUP_3,
//   fontScaleBody,
//   createSize,
//   SPACING_3,
//   SPACING_2,
//   SPACING_5,
// } from '@bbc/web-gel-foundations';
import SportBadge from './sport-badge/index.js';
import TeamName from './team-name.jsx';
// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const StyledTeam = styled.div`
  display: flex;
  gap: '8px';
  align-items: center;
  justify-content: flex-start;
  flex-grow: 2;
  font-size: 1rem;
  line-height: 1.375;

  flex-direction: ${({ isConciseView, shouldHideBadges }) =>
    isConciseView || shouldHideBadges ? 'row' : 'column'};

  @media (min-width: '${pixelsToRem(600)}rem') {
    gap: '20px';
    flex-direction: row;
  }

  ${({ isConciseView }) =>
    isConciseView &&
    css`
      @media (min-width: '${pixelsToRem(600)}rem') {
        gap: '12px';
      }
    `}
`;

const HomeTeam = styled(StyledTeam)`
  justify-content: flex-end;
  text-align: right;
  ${({ isConciseView, shouldHideBadges }) =>
    !isConciseView &&
    !shouldHideBadges &&
    css`
      @media (max-width: calc('${pixelsToRem(600)}rem' - '${pixelsToRem(
          1,
        )}rem')) {
        justify-content: flex-end;
        flex-direction: column-reverse;
        text-align: center;
      }
    `}
`;

const AwayTeam = styled(StyledTeam)`
  justify-content: flex-start;
  text-align: left;

  ${({ isConciseView, shouldHideBadges }) =>
    !isConciseView &&
    !shouldHideBadges &&
    css`
      @media (max-width: calc('${pixelsToRem(600)}rem' - '${pixelsToRem(
          1,
        )}rem')) {
        text-align: center;
      }
    `}
`;

const Team = ({
  alignment,
  name,
  shortName,
  urn,
  isConciseView,
  shouldHideBadges,
  badgePlaceholderFallbackType,
}) => {
  const size = isConciseView
    ? { small: 20, medium: 24, large: 24 }
    : { small: 40, medium: 44, large: 44 };
  if (alignment === 'home') {
    return (
      <HomeTeam
        isConciseView={isConciseView}
        shouldHideBadges={shouldHideBadges}
      >
        <TeamName
          fullName={name}
          shortName={shortName}
          isConciseView={isConciseView}
          shouldHideBadges={shouldHideBadges}
        />
        {!shouldHideBadges && (
          <SportBadge
            id={urn}
            size={size}
            isConciseView={isConciseView}
            placeholderFallbackType={badgePlaceholderFallbackType}
          />
        )}
      </HomeTeam>
    );
  }
  return (
    <AwayTeam isConciseView={isConciseView} shouldHideBadges={shouldHideBadges}>
      {!shouldHideBadges && (
        <SportBadge
          id={urn}
          size={size}
          isConciseView={isConciseView}
          placeholderFallbackType={badgePlaceholderFallbackType}
        />
      )}
      <TeamName
        fullName={name}
        shortName={shortName}
        isConciseView={isConciseView}
        shouldHideBadges={shouldHideBadges}
      />
    </AwayTeam>
  );
};

export default Team;
