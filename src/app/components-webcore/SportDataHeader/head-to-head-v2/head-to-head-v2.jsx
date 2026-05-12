import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import { ConditionalOnwardJourneyLink } from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import styles from './components/index.styles';

/**
 * @type {typeof import('./types.ts').HeadToHeadV2}
 */
export const HeadToHeadV2 = ({
  data,
  isConciseView,
  shouldShowActions,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}) => {
  const hasActions =
    data?.home?.actions?.length > 0 || data?.away?.actions?.length > 0;
  // const shouldHideBadges = !shouldShowTeamBadges(data.tournament?.urn);
  const shouldHideBadges = true; // TODO: Re-enable badge visibility logic once we have the necessary badge mappings in place

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
