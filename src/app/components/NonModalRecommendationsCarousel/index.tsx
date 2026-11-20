import { useRef } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import PortraitCarouselNavigation from '#app/components/PortraitVideoCarousel/PortraitVideoCarouselNavigation';
import RecommendationsImage from '#app/components/Recommendations/RecommendationsPromoImage';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { Recommendation } from '#app/models/types/onwardJourney';
import styles from './index.module.scss';

type Props = {
  data: Recommendation[];
  title: string;
  eventTrackingData: EventTrackingData;
};

const RecommendationCard = ({
  recommendation,
  eventTrackingData,
}: {
  recommendation: Recommendation;
  eventTrackingData: EventTrackingData;
}) => {
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  return (
    <li className={styles.item}>
      <a
        className={styles.card}
        href={recommendation.href}
        onFocus={event =>
          event.currentTarget.scrollIntoView({
            block: 'nearest',
            inline: 'center',
          })
        }
        {...clickTracker}
      >
        <div className={styles.image}>
          <RecommendationsImage
            image={recommendation.image}
            aspectRatio={[9, 16]}
            sizes="(min-width: 600px) 25vw, 45vw"
            lazyLoad
          />
        </div>
        <Text size="pica" fontVariant="sansBold" className={styles.headline}>
          {recommendation.title}
        </Text>
      </a>
    </li>
  );
};

const NonModalRecommendationsCarousel = ({
  data,
  title,
  eventTrackingData,
}: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const isHydrated = useHydrationDetection();
  const trackingData = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData.groupTracker,
      itemCount: data.length,
    },
  };
  const viewTracker = useViewTracker(trackingData);

  return (
    <>
      <Heading
        level={2}
        size="doublePica"
        id="recommendations-heading"
        className={styles.heading}
      >
        {title}
      </Heading>
      <div className={styles.container}>
        {isHydrated && (
          <PortraitCarouselNavigation
            scrollPaneRef={scrollRef}
            backgroundColor="rgba(246, 246, 246, 0.75)"
          />
        )}
        <ul
          ref={scrollRef}
          className={styles.carousel}
          role="list"
          data-testid="recommendations-carousel"
          {...viewTracker}
        >
          {data.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              eventTrackingData={{
                ...trackingData,
                itemTracker: {
                  type: 'midarticle-mostread-promo',
                  text: recommendation.title,
                  position: index + 1,
                },
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default NonModalRecommendationsCarousel;
