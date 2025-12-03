import { use } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Recommendation } from '#app/models/types/onwardJourney';
import RecommendationsImage from '../RecommendationsPromoImage';
import styles from './index.styles';

const RecommendationsItem = ({
  recommendation,
  eventTrackingData,
}: {
  recommendation: Recommendation | null;
  eventTrackingData?: Record<string, unknown>;
}) => {
  const { isLite } = use(RequestContext);

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  if (!recommendation) return null;

  const { title, image, href } = recommendation;

  return (
    <div css={styles.promoWrapper} data-e2e="recommendations-wrapper">
      {!isLite && (
        <div css={styles.imageWrapper}>
          <RecommendationsImage image={image} lazyLoad />
        </div>
      )}
      <div css={styles.textWrapper}>
        <div css={styles.headline}>
          <a css={styles.link} href={href} {...clickTrackerHandler}>
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsItem;
