import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import usePolling from '#app/hooks/usePolling';
import useToggle from '#app/hooks/useToggle';
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
  isSportDataLive = false,
}: {
  initialSportData: HeadToHeadV2Data;
  isConciseView?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: number;
  isSportDataLive?: boolean;
}) => {
  const { enabled: sportHeaderPollEnabled } = useToggle('sportDataPolling');
  const { translations, service } = use(ServiceContext);

  const currentSportData = usePolling<
    { sportDataEvent: HeadToHeadV2Data },
    HeadToHeadV2Data
  >({
    initialData: initialSportData,
    enabled: Boolean(sportHeaderPollEnabled) && isSportDataLive,
    endpoint: 'sport',
    params: { sportDataEventUrn: encodeURIComponent(initialSportData.urn) },
    returnedData: response => response.sportDataEvent,
  });

  const hasActions =
    (currentSportData?.home?.actions?.length ?? 0) > 0 ||
    (currentSportData?.away?.actions?.length ?? 0) > 0;

  const translatedSportData = translateSportData(
    currentSportData,
    translations,
    service,
  );

  return (
    <div css={styles.wrapper({ isConciseView })}>
      <ConditionalOnwardJourneyLink>
        <div css={styles.container({ isConciseView })}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={translatedSportData.date}
              time={translatedSportData.time}
              status={translatedSportData.status}
              tournament={translatedSportData.tournament?.name}
              stage={translatedSportData.stage?.name}
              service={service}
            />
          )}
          <HeadToHeadBanner
            data={translatedSportData}
            isConciseView={isConciseView ?? false}
            eventSummary={translatedSportData.accessibleEventSummary}
            shouldHideBadges={isConciseView ?? false}
            maxScoreLength={maximumContainerScoreDigits}
          />
          {hasActions && shouldShowActions && (
            <Actions data={translatedSportData} />
          )}
          {!isConciseView && <Actions data={translatedSportData} />}
        </div>
      </ConditionalOnwardJourneyLink>
    </div>
  );
};

export default HeadToHeadV2;
