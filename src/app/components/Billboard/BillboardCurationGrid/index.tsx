/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useMemo, useEffect, useState } from 'react';
import styles from './index.styles';
import CurationPromo from '../../Curation/CurationPromo';
import { CurationGridProps } from '../../Curation/types';

const BillboardCurationGrid = ({
  summaries,
  isFirstCuration,
}: CurationGridProps) => {
  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];
  if (summaries.length === 0) {
    return null;
  }
  return (
    <div data-testid="curation-grid-normal">
      {hasMultiplePromos ? (
        <ul css={styles.list} role="list" data-testid="topic-promos">
          {summaries.map((promo, index) => {
            const isFirstPromo = index === 0;
            const lazyLoadImages = !(isFirstPromo && isFirstCuration);

            return (
              <li css={styles.item} key={promo.id}>
                <CurationPromo
                  {...promo}
                  lazy={lazyLoadImages}
                  headingLevel={3}
                  isBillboardContext
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo {...firstPromo} lazy={!isFirstCuration} />
        </div>
      )}
    </div>
  );
};

export default BillboardCurationGrid;
