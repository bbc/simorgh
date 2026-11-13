import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import LiveLabel from '../../LiveLabel';
import { getPromoHref, getPromoTitle } from '../helpers/getPromoDetails';
import styles from './index.module.scss';

interface LivePromoProps {
  block: TopStoryItem;
}

const eventTrackingData: EventTrackingMetadata = {
  componentName: 'top-bar-live-promo',
};

const LivePromo = ({ block }: LivePromoProps) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <div
      className={styles.wrapper}
      data-testid="top-bar-live-promo"
      {...viewTracker}
    >
      <div className={styles.promo}>
        <a
          className={styles.link}
          href={getPromoHref(block)}
          {...clickTrackerHandler}
        >
          <LiveLabel />
          {getPromoTitle(block)}
        </a>
      </div>
    </div>
  );
};

export default LivePromo;
