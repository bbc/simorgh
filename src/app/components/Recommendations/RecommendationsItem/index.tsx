import { use } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Recommendation } from '#app/models/types/onwardJourney';
import RecommendationsImage from '../RecommendationsPromoImage';
import styles from './index.module.css';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

const RecommendationsItem = ({
  recommendation,
}: {
  recommendation: Recommendation | null;
}) => {
  const { isLite } = use(RequestContext);

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  if (!recommendation) return null;

  const { title, image, href } = recommendation;

  return (
    <div className={styles.promoWrapper} data-e2e="recommendations-wrapper">
      {!isLite && (
        <div className={styles.imageWrapper}>
          <RecommendationsImage image={image} lazyLoad />
        </div>
      )}
      <div className={styles.textWrapper}>
        <div className={styles.headline}>
          <a className={styles.link} href={href} {...clickTrackerHandler}>
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsItem;
