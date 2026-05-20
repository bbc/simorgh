import type { EventTrackingMetadata } from '#app/models/types/eventTracking';
import type { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: TopStoryItem[];
  id?: string;
  eventTrackingData?: EventTrackingMetadata;
}

const PromoList = ({
  blocks,
  eventTrackingData,
  id = 'top-bar-oj-promo-list',
}: PromoListProps) => {
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 3);

  const scrollablePromoStyles = isOperaMini
    ? styles.operaScrollPromo
    : styles.standardScrollPromo;

  const listStyles = isOperaMini ? styles.operaStyledList : styles.list;

  return (
    <ul css={scrollablePromoStyles} aria-labelledby={id} data-testid={id}>
      {listBlocks.map((block, index) => {
        return (
          <li
            css={listStyles}
            // biome-ignore lint/suspicious/noArrayIndexKey: we want this
            key={index}
          >
            <Promo block={block} eventTrackingData={eventTrackingData} />
          </li>
        );
      })}
    </ul>
  );
};

export default PromoList;
