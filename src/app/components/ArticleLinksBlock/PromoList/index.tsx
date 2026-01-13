import { OptimoBlock } from '#app/models/types/optimo';
import { ViewTracker } from '#app/lib/analyticsUtils/types';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import Promo from '../Promo';
import styles from './index.styles';

interface PromoListProps {
  blocks: OptimoBlock[];
  viewTracker?: ViewTracker;
  clickTracker?: ReturnType<typeof useClickTrackerHandler>;
}

const PromoList = ({ blocks, viewTracker, clickTracker }: PromoListProps) => {
  const listBlocks = blocks.slice(0, 3);

  return (
    <div css={[styles.promo]} {...viewTracker}>
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
