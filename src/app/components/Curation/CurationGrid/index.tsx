/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({
  promos,
  headingLevel,
  isFirstCuration,
}: CurationGridProps) => {
  const hasMultiplePromos = promos.length > 1;
  const firstPromo = promos[0];

  if (promos.length === 0) {
    return null;
  }
  return (
    <div data-testid="curation-grid-normal">
      {hasMultiplePromos ? (
        <ul css={styles.list} role="list" data-testid="topic-promos">
          {promos.map((promo, index) => {
            const isFirstPromo = index === 0;
            const lazyLoadImages = !(isFirstPromo && isFirstCuration);
            const fetchPriority =
              isFirstPromo && isFirstCuration ? 'high' : 'auto';

            return (
              <li css={styles.item} key={promo.id}>
                <CurationPromo
                  {...promo}
                  headingLevel={headingLevel}
                  lazy={lazyLoadImages}
                  fetchpriority={fetchPriority}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo {...firstPromo} />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
