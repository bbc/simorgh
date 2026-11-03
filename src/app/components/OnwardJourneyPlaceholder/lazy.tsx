import dynamic from 'next/dynamic';
import type { OnwardJourney } from '#app/contexts/ArticleOnwardJourneysContext';

const OnwardJourneyPlaceholder = dynamic(() => import('.'), { ssr: false });

type Props = {
  onwardJourney: OnwardJourney;
};

const LazyOnwardJourneyPlaceholder = ({ onwardJourney }: Props) => (
  <div
    data-testid={`onward-journey-reservation-${onwardJourney}`}
    style={{ minBlockSize: '10rem' }}
    aria-hidden="true"
  >
    <OnwardJourneyPlaceholder onwardJourney={onwardJourney} />
  </div>
);

export default LazyOnwardJourneyPlaceholder;
