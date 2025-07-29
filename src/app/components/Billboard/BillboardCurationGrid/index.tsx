/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import CurationPromo from '../../Curation/CurationPromo';
import { CurationGridProps } from '../../Curation/types';

const BillboardCurationGrid = ({ summaries }: CurationGridProps) => {
  const top4SummariesForGrid = summaries.slice(0, 4);

  if (top4SummariesForGrid.length === 0) {
    return null;
  }

  const hasMultiplePromos = top4SummariesForGrid.length > 1;
  const firstPromo = top4SummariesForGrid[0];

  return (
    <div data-testid="billboard-curation-grid">
      {hasMultiplePromos ? (
        <ul css={styles.list} role="list" data-testid="billboard-promos">
          {top4SummariesForGrid.map(promo => (
            <li css={styles.item} key={promo.id}>
              <CurationPromo {...promo} lazy headingLevel={3} />
            </li>
          ))}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo {...firstPromo} lazy headingLevel={3} />
        </div>
      )}
    </div>
  );
};

export default BillboardCurationGrid;
