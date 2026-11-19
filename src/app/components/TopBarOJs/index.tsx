import { use } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import OnwardJourneyPlaceholder from '#app/components/OnwardJourneyPlaceholder/lazy';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import { RequestContext } from '#app/contexts/RequestContext';
import isTopBarOnwardJourneyExperiment from '#app/lib/utilities/isTopBarOnwardJourneyExperiment';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { ServiceContext } from '../../contexts/ServiceContext';
import PromoList from './PromoList';
import styles from './index.styles';

interface TopBarOJsProps {
  blocks: TopStoryItem[];
  id?: string;
}

const eventTrackingData: EventTrackingMetadata = {
  componentName: 'top-bar-oj',
};

const TopBarOJs = ({
  blocks,
  id = 'top-bar-onward-journeys',
}: TopBarOJsProps) => {
  const { translations } = use(ServiceContext);
  const { serverSideExperiments } = use(RequestContext);
  const viewTracker = useViewTracker(eventTrackingData);
  const onwardJourneyContext = useOnwardJourneyRequest();
  const hydratedBlocks =
    onwardJourneyContext?.article?.secondaryColumn?.topStories;
  const topStoriesBlocks = blocks?.length ? blocks : hydratedBlocks;
  const hasBlocks = Boolean(topStoriesBlocks?.length);
  const isTopBarExperimentTreatment = isTopBarOnwardJourneyExperiment(
    serverSideExperiments,
  );

  if (
    !hasBlocks &&
    (!onwardJourneyContext?.isEnabled || !isTopBarExperimentTreatment)
  ) {
    return null;
  }

  const title = translations.topStoriesTitle || 'Top Stories';

  return (
    <div
      role="region"
      aria-label={id}
      data-testid={id}
      css={styles.topBarOJWrapper}
      {...viewTracker}
    >
      {hasBlocks ? (
        <>
          <strong css={styles.labelComponent} id={id}>
            {title}
          </strong>
          <div css={styles.promoContainer}>
            <PromoList
              blocks={topStoriesBlocks ?? []}
              eventTrackingData={eventTrackingData}
            />
          </div>
        </>
      ) : (
        <OnwardJourneyPlaceholder onwardJourney="topStoriesAndFeatures" />
      )}
    </div>
  );
};

export default TopBarOJs;
