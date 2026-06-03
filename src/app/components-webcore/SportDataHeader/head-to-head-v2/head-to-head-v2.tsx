import useSportDataPolling from '#app/hooks/useSportDataPolling';
import useToggle from '#app/hooks/useToggle';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import ConditionalOnwardJourneyLink from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import { HeadToHeadV2Data } from './types';
import styles from './index.styles';

export const HeadToHeadV2 = ({
  initialSportData,
  isConciseView,
  shouldShowActions,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
  isSportDataLive = false,
}: {
  initialSportData: HeadToHeadV2Data;
  isConciseView?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: number;
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
  isSportDataLive?: boolean;
}) => {
  const { enabled: sportHeaderPollEnabled } = useToggle('sportDataPolling');

  const { currentSportData } = useSportDataPolling(
    initialSportData,
    Boolean(sportHeaderPollEnabled) && isSportDataLive,
  );

  const hasActions =
    (currentSportData?.home?.actions?.length ?? 0) > 0 ||
    (currentSportData?.away?.actions?.length ?? 0) > 0;

  // TODO: Re-enable badge visibility logic once we have the necessary badge mappings in place
  const shouldHideBadges = true;

  return (
    <div css={styles.wrapper({ isConciseView })}>
      <ConditionalOnwardJourneyLink>
        <div css={styles.container({ isConciseView })}>
          <HeadToHeadBanner
            data={currentSportData}
            isConciseView={isConciseView ?? false}
            eventSummary={currentSportData.accessibleEventSummary}
            shouldHideBadges={shouldHideBadges}
            maxScoreLength={maximumContainerScoreDigits}
            teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
          {hasActions && shouldShowActions && (
            <Actions data={currentSportData} />
          )}
          {!isConciseView && <Actions data={currentSportData} />}
        </div>
      </ConditionalOnwardJourneyLink>
    </div>
  );
};

export default HeadToHeadV2;
