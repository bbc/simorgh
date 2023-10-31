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

            return (
              <li css={styles.item} key={promo.id}>
                <CurationPromo
                  {...promo}
                  headingLevel={headingLevel}
                  lazy={lazyLoadImages}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo {...firstPromo} headingLevel={headingLevel} />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
