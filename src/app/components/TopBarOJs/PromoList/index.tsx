/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import useViewTracker from '#hooks/useViewTracker';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: TopStoryItem[];
  eventTrackingData: EventTrackingMetadata;
}

const PromoList = ({
  blocks,
  eventTrackingData,
  // a11yAttributes, // will pass these later
}: PromoListProps) => {
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 3);

  const viewTracker = useViewTracker(eventTrackingData);

  const scrollablePromoStyles = isOperaMini
    ? styles.operaScrollPromo
    : styles.standardScrollPromo;

  const listStyles = isOperaMini ? styles.operaStyledList : styles.list;

  return (
    <div
      css={scrollablePromoStyles}
      role="list"
      {...viewTracker}
      // {...a11yAttributes}
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
    </div>
  );
};

export default PromoList;
