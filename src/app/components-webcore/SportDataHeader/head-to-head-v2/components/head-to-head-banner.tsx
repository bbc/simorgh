/** @jsxImportSource @emotion/react */
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import Team from './team';
import Centre from './centre';
import MatchProgress from './match-progress';
import PenaltyScores from './penalty-scores';
import styles from './index.styles';
import type { HeadToHeadV2Data } from '../types';

interface ItemWrapperProps {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
  shouldHideBadges?: boolean;
  maxScoreLength?: number;
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
}

const ItemWrapper = ({
  data,
  isConciseView,
  shouldHideBadges,
  maxScoreLength,
  teamBadgePlaceholderFallbackType,
}: ItemWrapperProps) => {
  const shouldDisplayPenScores =
    data.home.runningScores?.penaltyShootout &&
    data.away.runningScores?.penaltyShootout;
  return (
    <>
      <div
        css={styles.gridContainer(isConciseView, shouldHideBadges)}
        data-event-id={data.id}
      >
        <div css={styles.teamHome()} data-participant-id={data.home.id}>
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
        </div>
        <div css={styles.scores()}>
          <Centre
            data={data}
            isConciseView={isConciseView}
            maxScoreLength={maxScoreLength}
          />
          {data.status === 'PreEvent' && (
            <VisuallyHiddenText>plays</VisuallyHiddenText>
          )}
        </div>
        <div css={styles.teamAway()} data-participant-id={data.away.id}>
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
        </div>
        <div css={styles.matchProgressContainer()}>
          <MatchProgress data={data} isConciseView={isConciseView} />
        </div>
      </div>
      {shouldDisplayPenScores && (
        <PenaltyScores data={data} isConciseView={isConciseView} />
      )}
    </>
  );
};

interface HeadToHeadBannerProps {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
  eventSummary: string;
  shouldHideBadges?: boolean;
  maxScoreLength?: number;
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
}

export const HeadToHeadBanner = ({
  data,
  isConciseView,
  eventSummary,
  shouldHideBadges,
  maxScoreLength,
  teamBadgePlaceholderFallbackType,
}: HeadToHeadBannerProps) => (
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
