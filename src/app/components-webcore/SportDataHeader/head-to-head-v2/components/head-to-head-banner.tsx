import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import Team from './team';
import Centre from './centre';
import MatchProgress from './match-progress';
import PenaltyScores from './penalty-scores';
import styles from '../index.styles';
import type { HeadToHeadV2Data, BadgePlaceholderFallbackType } from '../types';

interface ItemWrapperProps {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
  shouldHideBadges: boolean;
  maxScoreLength?: number;
}

const ItemWrapper = ({
  data,
  isConciseView,
  shouldHideBadges,
  maxScoreLength,
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
        <div css={styles.teamHome} data-participant-id={data.home.id}>
          <Team
            urn={data.home.urn}
            alignment="home"
            name={data.home.fullName}
            shortName={data.home.shortName}
            isConciseView={isConciseView}
            imageUrl={data.home.imageSrc}
          />
        </div>
        <div css={styles.scores}>
          <Centre data={data} maxScoreLength={maxScoreLength} />
          {data.status === 'PreEvent' && (
            <VisuallyHiddenText>plays</VisuallyHiddenText>
          )}
        </div>
        <div css={styles.teamAway} data-participant-id={data.away.id}>
          <Team
            urn={data.home.urn}
            alignment="away"
            name={data.away.fullName}
            shortName={data.away.shortName}
            isConciseView={isConciseView}
            imageUrl={data.away.imageSrc}
          />
        </div>
        <div css={styles.matchProgressContainer}>
          <MatchProgress data={data} isConciseView={isConciseView} />
        </div>
      </div>
      {shouldDisplayPenScores && <PenaltyScores data={data} />}
    </>
  );
};

interface HeadToHeadBannerProps {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
  eventSummary: string;
  shouldHideBadges: boolean;
  maxScoreLength?: number;
  teamBadgePlaceholderFallbackType?: BadgePlaceholderFallbackType;
}

export const HeadToHeadBanner = ({
  data,
  isConciseView,
  eventSummary,
  shouldHideBadges,
  maxScoreLength,
}: HeadToHeadBannerProps) => (
  <>
    <VisuallyHiddenText>{eventSummary}</VisuallyHiddenText>
    <ItemWrapper
      data={data}
      isConciseView={isConciseView}
      shouldHideBadges={shouldHideBadges}
      maxScoreLength={maxScoreLength}
    />
  </>
);

export default HeadToHeadBanner;
