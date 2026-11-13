import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import LiveLabel from '../LiveLabel';
import {
  getLivePageBlock,
  getPromoHref,
  getPromoTitle,
} from './helpers/getPromoDetails';
import styles from './index.module.scss';

interface LivePagePromoExperimentProps {
  blocks: TopStoryItem[];
}

const eventTrackingData: EventTrackingMetadata = {
  componentName: 'top-bar-live-promo',
};

const LivePagePromoExperiment = ({ blocks }: LivePagePromoExperimentProps) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const livePageBlock = getLivePageBlock(blocks);

  if (!livePageBlock) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      data-testid="top-bar-live-promo"
      {...viewTracker}
    >
      <div className={styles.promo}>
        <a
          className={styles.link}
          href={getPromoHref(livePageBlock)}
          {...clickTrackerHandler}
        >
          <LiveLabel />
          {getPromoTitle(livePageBlock)}
        </a>
      </div>
    </div>
  );
};

export default LivePagePromoExperiment;
