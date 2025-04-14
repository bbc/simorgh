/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Recommendation } from '#app/models/types/onwardJourney';
import RecommendationsImage from '../RecommendationsPromoImage';
import styles from './index.styles';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

const RecommendationsItem = ({
  recommendation,
}: {
  recommendation: Recommendation | null;
}) => {
  const { isLite } = useContext(RequestContext);

  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

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
          <a css={styles.link} href={href} onClick={handleClickTracking}>
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsItem;
