import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import type { OnwardJourney } from '#app/contexts/ArticleOnwardJourneysContext';

const OnwardJourneyPlaceholder = dynamic(() => import('.'), { ssr: false });

type Props = {
  onwardJourney: OnwardJourney;
};

const LazyOnwardJourneyPlaceholder = ({ onwardJourney }: Props) => {
  const [isSkeletonReady, setIsSkeletonReady] = useState(false);
  const handleSkeletonReady = useCallback(() => setIsSkeletonReady(true), []);

  return (
    <div
      data-testid={`onward-journey-reservation-${onwardJourney}`}
      style={isSkeletonReady ? undefined : { minBlockSize: '10rem' }}
      aria-hidden="true"
    >
      <OnwardJourneyPlaceholder
        onwardJourney={onwardJourney}
        onSkeletonReady={handleSkeletonReady}
      />
    </div>
  );
};

export default LazyOnwardJourneyPlaceholder;
