import { use } from 'react';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { OptimoBlock } from '#app/models/types/optimo';
import { ViewTracker } from '#app/lib/analyticsUtils/types';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: OptimoBlock[];
  eventTrackingData?: EventTrackingMetadata;
  viewTracker?: ViewTracker;
  clickTracker?: ReturnType<typeof useClickTrackerHandler>;
}

const PromoList = ({ blocks, viewTracker, clickTracker }: PromoListProps) => {
  const { dir } = use(ServiceContext);
  const listBlocks = blocks.slice(0, 3);

  return (
    <div css={[styles.promo, styles.list]} dir={dir} {...viewTracker}>
      <ul>
        {listBlocks.map((block, index) => {
          return (
            <li
              css={styles.list}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <Promo block={block} clickTracker={clickTracker} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PromoList;
