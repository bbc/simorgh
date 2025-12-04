import { use } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
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

  const viewTracker = useViewTracker(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
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
      <strong css={styles.labelComponent} id={id}>
        {title}
      </strong>
      <div css={styles.promoContainer}>
        <PromoList blocks={blocks} eventTrackingData={eventTrackingData} />
      </div>
    </div>
  );
};

export default TopBarOJs;
