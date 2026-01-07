import { use } from 'react';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: OptimoBlock[];
  eventTrackingData?: EventTrackingMetadata;
}

const PromoList = ({ blocks }: PromoListProps) => {
  const { dir } = use(ServiceContext);
  const listBlocks = blocks.slice(0, 3);

  return (
    <div css={[styles.promo, styles.list]} dir={dir}>
      <ul>
        {listBlocks.map((block, index) => {
          return (
            <li
              css={styles.list}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <Promo block={block} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PromoList;
