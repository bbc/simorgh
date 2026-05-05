// import React from 'react';
// import styled, { css } from '@bbc/web-styled';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
// import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import Team from './team';
import Centre from './centre';
import MatchProgress from './match-progress';
import PenaltyScores from './penalty-scores';
// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: ${({ isConciseView }) => (isConciseView ? 'center' : 'none')};
  grid-template-areas:
    'home_team         scores            away_team'
    'progress          progress          progress';
  ${({ isConciseView, shouldHideBadges }) =>
    !isConciseView &&
    !shouldHideBadges &&
    css`
      @media (max-width: calc(${pixelsToRem(600)}rem - ${pixelsToRem(1)}rem)) {
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

const ItemWrapper = ({
  data,
  isConciseView,
  shouldHideBadges,
  maxScoreLength,
  teamBadgePlaceholderFallbackType,
}) => {
  const shouldDisplayPenScores =
    data.home.runningScores?.penaltyShootout &&
    data.away.runningScores?.penaltyShootout;
  return (
    <>
      <GridContainer
        isConciseView={isConciseView}
        data-event-id={data.id}
        shouldHideBadges={shouldHideBadges}
      >
        <TeamHome data-participant-id={data.home.id}>
          <Team
            // eslint-disable-next-line react/jsx-curly-brace-presence
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
          <Centre
            data={data}
            isConciseView={isConciseView}
            maxScoreLength={maxScoreLength}
          />
          {data.status === 'PreEvent' && (
            <VisuallyHiddenText>plays</VisuallyHiddenText>
          )}
        </Scores>
        <TeamAway data-participant-id={data.away.id}>
          <Team
            // eslint-disable-next-line react/jsx-curly-brace-presence
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
      {shouldDisplayPenScores && (
        <PenaltyScores data={data} isConciseView={isConciseView} />
      )}
    </>
  );
};

export const HeadToHeadBanner = ({
  data,
  isConciseView,
  eventSummary,
  shouldHideBadges,
  maxScoreLength,
  teamBadgePlaceholderFallbackType,
}) => (
  <>
    <VisuallyHiddenText>{eventSummary}</VisuallyHiddenText>
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
