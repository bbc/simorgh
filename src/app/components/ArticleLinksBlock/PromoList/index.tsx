import type useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import type { ViewTracker } from '#app/lib/analyticsUtils/types';
import type { OptimoBlock } from '#app/models/types/optimo';
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
              // biome-ignore lint/suspicious/noArrayIndexKey: we want this
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
