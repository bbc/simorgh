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

const PromoList = ({
  blocks,
  eventTrackingData,
  // viewTracker,
}: PromoListProps) => {
  const { dir } = use(ServiceContext);
  const isOperaMini = useOperaMiniDetection();
  const listBlocks = blocks.slice(0, 3);

  const scrollablePromoStyles = isOperaMini
    ? styles.operaScrollPromo
    : styles.standardScrollPromo;

  const listStyles = isOperaMini ? styles.operaStyledList : styles.list;

  return (
    // <ScrollPromo
    //   dir={dir}
    //   role="list"
    //   isOperaMini={isOperaMini}
    //   // {...viewTracker}
    //   // {...a11yAttributes}
    // >
    <ul css={scrollablePromoStyles} role="list">
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
    // </ScrollPromo>
  );
};

export default PromoList;
