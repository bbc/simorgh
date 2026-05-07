import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import { ConditionalOnwardJourneyLink } from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import styles from './components/index.styles';
import type { HeadToHeadV2Data } from './types';

type PlaceholderFallbackType = 'badge' | 'flag';

export interface HeadToHeadV2Props {
  data: HeadToHeadV2Data & {
    onwardJourneyLink?: string;
    tipoTopicId?: string;
    period?: string;
    attendance?: {
      value?: number;
      additionalInfo?: string;
    };
  };
  isConciseView?: boolean;
  shouldHideBadges?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: string;
  teamBadgePlaceholderFallbackType?: PlaceholderFallbackType;
}

export const HeadToHeadV2 = ({
  data,
  isConciseView = false,
  shouldHideBadges: _shouldHideBadges,
  shouldShowActions = false,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}: HeadToHeadV2Props) => {
  const hasActions =
    (data?.home?.actions?.length ?? 0) > 0 ||
    (data?.away?.actions?.length ?? 0) > 0;
  // const shouldHideBadges = !shouldShowTeamBadges(data.tournament?.urn);
  const shouldHideBadges = true; // TODO: Re-enable badge visibility logic once we have the necessary badge mappings in place

  return (
    <div css={styles.headToHeadWrapper(isConciseView)}>
      <ConditionalOnwardJourneyLink>
        <div css={styles.headToHead(isConciseView)}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={data.date}
              tournamentDescriptionLabel={data.tournamentDescriptionLabel}
              status={data.status}
            />
          )}
          <HeadToHeadBanner
            data={data}
            isConciseView={isConciseView}
            eventSummary={data.accessibleEventSummary}
            shouldHideBadges={shouldHideBadges}
            maxScoreLength={
              maximumContainerScoreDigits
                ? Number(maximumContainerScoreDigits)
                : undefined
            }
            teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
          {hasActions && shouldShowActions && <Actions data={data} />}
          {!isConciseView && <Actions data={data} />}
          {!isConciseView && (
            <Footer
              venue={data.venue?.name || 'To be confirmed'}
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
