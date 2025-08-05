/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useViewTracker from '#hooks/useViewTracker';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: TopStoryItem[];
  id?: string;
  eventTrackingData?: {
    componentName: string;
  };
}

const PromoList = ({
  blocks,
  eventTrackingData,
  id = 'top-bar-oj-promo-list',
}: PromoListProps) => {
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 3);

  const viewTracker = useViewTracker(eventTrackingData);

  const scrollablePromoStyles = isOperaMini
    ? styles.operaScrollPromo
    : styles.standardScrollPromo;

  const listStyles = isOperaMini ? styles.operaStyledList : styles.list;

  return (
    <ul
      css={scrollablePromoStyles}
      role="list"
      {...viewTracker}
      aria-labelledby={id}
      data-testid={id}
    >
      {listBlocks.map((block, index) => {
        return (
          <li
            css={listStyles}
            // eslint-disable-next-line react/no-array-index-key
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
