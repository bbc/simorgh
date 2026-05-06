/** @jsxImportSource @emotion/react */
import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import { ConditionalOnwardJourneyLink } from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import styles from './components/index.styles';
import type { HeadToHeadV2Data } from './types';

interface HeadToHeadV2Props {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
  shouldHideBadges?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: number;
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
}

export const HeadToHeadV2 = ({
  data,
  isConciseView,
  shouldHideBadges: shouldHideBadgesProp,
  shouldShowActions,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}: HeadToHeadV2Props) => {
  const hasActions =
    (data?.home?.actions?.length ?? 0) > 0 ||
    (data?.away?.actions?.length ?? 0) > 0;
  // TODO: Re-enable badge visibility logic once we have the necessary badge mappings in place
  const shouldHideBadges = shouldHideBadgesProp ?? true;

  return (
    <div css={styles.headToHeadWrapper(isConciseView)}>
      <ConditionalOnwardJourneyLink
        isConciseView={isConciseView}
        onwardJourneyLink={data.onwardJourneyLink}
        tipoTopicId={data.tipoTopicId}
      >
        <div css={styles.headToHead(isConciseView)}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={data.date}
              tournament={data.tournament.name}
              status={data.status}
              period={data.period}
              tournamentDescriptionLabel={data.tournamentDescriptionLabel}
            />
          )}
          <HeadToHeadBanner
            data={data}
            isConciseView={isConciseView}
            eventSummary={data.accessibleEventSummary}
            shouldHideBadges={shouldHideBadges}
            maxScoreLength={maximumContainerScoreDigits}
            teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
          {hasActions && shouldShowActions && <Actions data={data} />}
          {!isConciseView && <Actions data={data} />}
          {!isConciseView && (
            <Footer
              venue={data.venue?.name || 'To be confirmed'}
              status={data.status}
              attendanceValue={data.attendance?.value}
              attendanceInfo={data.attendance?.additionalInfo}
            />
          )}
        </div>
      </ConditionalOnwardJourneyLink>
    </div>
  );
};

export default HeadToHeadV2;
