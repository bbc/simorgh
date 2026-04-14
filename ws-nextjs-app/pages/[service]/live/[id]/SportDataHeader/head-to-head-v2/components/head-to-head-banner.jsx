import React from 'react';
import styled, { css } from '@bbc/web-styled';
import { GROUP_3, createSize } from '@bbc/web-gel-foundations';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import Team from './team.jsx';
import Centre from './centre.jsx';
import MatchProgress from './match-progress.jsx';
import PenaltyScores from './penalty-scores.jsx';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: ${({ isConciseView }) => (isConciseView ? `center` : `none`)};
  grid-template-areas:
    'home_team         scores            away_team'
    'progress          progress          progress';
  ${({ isConciseView, shouldHideBadges }) =>
    !isConciseView &&
    !shouldHideBadges &&
    css`
      @media (max-width: calc(${GROUP_3} - ${createSize(1)})) {
        grid-template-columns: 1fr auto auto 1fr;
        grid-template-areas:
          'home_team         scores            scores            away_team'
          'home_team         progress          progress          away_team';
      }
    `}
`;

const WithInlineFallback = styled.div`
  @supports not (display: grid) {
    display: inline-block;
    width: 33%;
  }
`;

export const TeamHome = styled(WithInlineFallback)`
  grid-area: home_team;
  display: flex;
  align-items: stretch;
`;

export const TeamAway = styled(WithInlineFallback)`
  grid-area: away_team;
  display: flex;
  align-items: stretch;
`;

const Scores = styled(WithInlineFallback)`
  grid-area: scores;
  margin: auto;
`;

const MatchProgressContainer = styled.div`
  grid-area: progress;
`;

const ItemWrapper = ({ data, isConciseView, shouldHideBadges, maxScoreLength, teamBadgePlaceholderFallbackType }) => {
  const shouldDisplayPenScores = data.home.runningScores?.penaltyShootout && data.away.runningScores?.penaltyShootout;
  return (
    <>
      <GridContainer isConciseView={isConciseView} data-event-id={data.id} shouldHideBadges={shouldHideBadges}>
        <TeamHome data-participant-id={data.home.id}>
          <Team
            alignment={'home'}
            name={data.home.fullName}
            shortName={data.home.shortName}
            urn={data.home.urn}
            isConciseView={isConciseView}
            shouldHideBadges={shouldHideBadges}
            badgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
        </TeamHome>
        <Scores>
          <Centre data={data} isConciseView={isConciseView} maxScoreLength={maxScoreLength} />
          {data.status === 'PreEvent' && <VisuallyHidden>plays</VisuallyHidden>}
        </Scores>
        <TeamAway data-participant-id={data.away.id}>
          <Team
            alignment={'away'}
            name={data.away.fullName}
            shortName={data.away.shortName}
            urn={data.away.urn}
            isConciseView={isConciseView}
            shouldHideBadges={shouldHideBadges}
            badgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
        </TeamAway>
        <MatchProgressContainer isConciseView={isConciseView}>
          <MatchProgress data={data} isConciseView={isConciseView} />
        </MatchProgressContainer>
      </GridContainer>
      {shouldDisplayPenScores && <PenaltyScores data={data} isConciseView={isConciseView} />}
    </>
  );
};

export const HeadToHeadBanner = ({
  data,
  isConciseView,
  eventSummary,
  shouldHideBadges,
  maxScoreLength,
  teamBadgePlaceholderFallbackType
}) => (
  <>
    <VisuallyHidden>{eventSummary}</VisuallyHidden>
    <ItemWrapper
      data={data}
      isConciseView={isConciseView}
      shouldHideBadges={shouldHideBadges}
      data-event-id={data.id}
      maxScoreLength={maxScoreLength}
      teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
    />
  </>
);

export default HeadToHeadBanner;
