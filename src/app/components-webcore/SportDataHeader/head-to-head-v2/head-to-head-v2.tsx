import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useSportDataPolling from '#app/hooks/useSportDataPolling';
import useToggle from '#app/hooks/useToggle';
import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import ConditionalOnwardJourneyLink from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';
import { HeadToHeadV2Data } from './types';
import styles from './index.styles';
import translateSportData from './transformers/translateSportData';

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
  const { translations } = use(ServiceContext);

  const { currentSportData } = useSportDataPolling(
    initialSportData,
    Boolean(sportHeaderPollEnabled) && isSportDataLive,
  );

  const hasActions =
    (currentSportData?.home?.actions?.length ?? 0) > 0 ||
    (currentSportData?.away?.actions?.length ?? 0) > 0;

  // TODO: Re-enable badge visibility logic once we have the necessary badge mappings in place
  const shouldHideBadges = true;

  const translatedSportData = translateSportData(
    currentSportData,
    translations,
  );

  return (
    <div css={styles.wrapper({ isConciseView })}>
      <ConditionalOnwardJourneyLink>
        <div css={styles.container({ isConciseView })}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={translatedSportData.date}
              status={translatedSportData.status}
              tournamentDescriptionLabel={
                translatedSportData.tournamentDescriptionLabel
              }
            />
          )}
          <HeadToHeadBanner
            data={translatedSportData}
            isConciseView={isConciseView ?? false}
            eventSummary={translatedSportData.accessibleEventSummary}
            shouldHideBadges={shouldHideBadges}
            maxScoreLength={maximumContainerScoreDigits}
            teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
          {hasActions && shouldShowActions && (
            <Actions data={translatedSportData} />
          )}
          {!isConciseView && <Actions data={translatedSportData} />}
          {!isConciseView && (
            <Footer
              venue={translatedSportData.venue?.name || 'To be confirmed'}
              attendanceValue={translatedSportData.attendance?.value}
              attendanceInfo={translatedSportData.attendance?.additionalInfo}
            />
          )}
        </div>
      </ConditionalOnwardJourneyLink>
    </div>
  );
};

export default HeadToHeadV2;
