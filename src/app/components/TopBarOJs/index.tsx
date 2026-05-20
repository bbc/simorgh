import { use } from 'react';
import isEmpty from 'ramda/src/isEmpty';

import type { EventTrackingMetadata } from '#app/models/types/eventTracking';
import type { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import PromoList from './PromoList';

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
