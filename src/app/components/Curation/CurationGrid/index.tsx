/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
  mostReadItemId,
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
                  headingLevel={headingLevel}
                  mostReadItemId={mostReadItemId}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo
            {...firstPromo}
            lazy={!isFirstCuration}
            headingLevel={headingLevel}
            mostReadItemId={mostReadItemId}
          />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
