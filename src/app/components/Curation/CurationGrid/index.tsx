/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({ promos, headingLevel }: CurationGridProps) => {
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
            const lazyLoadImages = index >= 0;

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
        <div css={styles.item} key={firstPromo.id}>
          <CurationPromo {...firstPromo} />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
