import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import { ConditionalOnwardJourneyLink } from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import { HeadToHeadV2Data } from './types';
import styles from './index.styles';

export const HeadToHeadV2 = ({
  data,
  isConciseView,
  shouldShowActions,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}: {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: number;
  teamBadgePlaceholderFallbackType?: string;
}) => {
  const hasActions =
    (data?.home?.actions?.length ?? 0) > 0 ||
    (data?.away?.actions?.length ?? 0) > 0;
  const shouldHideBadges = true;

  return (
    <div css={styles.wrapper({ isConciseView })}>
      <ConditionalOnwardJourneyLink>
        <div css={styles.container({ isConciseView })}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={data.date}
              status={data.status}
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
