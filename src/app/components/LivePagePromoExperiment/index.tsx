import Promo from '#components/OptimoPromos';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import getLivePageBlock from './helpers/getLivePageBlock';
import styles from './index.module.scss';

interface LivePagePromoExperimentProps {
  blocks: TopStoryItem[];
}

const eventTrackingData: EventTrackingMetadata = {
  componentName: 'top-bar-live-promo',
};

const ariaLabelledBy = 'live-page-promo-experiment';

const LivePagePromoExperiment = ({ blocks }: LivePagePromoExperimentProps) => {
  const viewTracker = useViewTracker(eventTrackingData);

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
      <Promo
        className={styles.promo}
        to={livePageBlock.destinationUrl}
        ariaLabelledBy={ariaLabelledBy}
        eventTrackingData={{ block: eventTrackingData }}
      >
        <Promo.Link>
          <Promo.LiveLabel id={ariaLabelledBy}>
            <Promo.Content headline={livePageBlock.headline} isLive />
          </Promo.LiveLabel>
        </Promo.Link>
      </Promo>
    </div>
  );
};

export default LivePagePromoExperiment;
