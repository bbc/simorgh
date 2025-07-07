/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState, useCallback } from 'react';
import styles from './index.styles';
import CurationPromo from '../../Curation/CurationPromo';
import { CurationGridProps } from '../../Curation/types';
import useMediaQuery from '../../../hooks/useMediaQuery';

const group3OnlyQuery = '(min-width:600px) and (max-width:1007px)';

const BillboardCurationGrid = ({ summaries }: CurationGridProps) => {
  const [isGroup3Only, setIsGroup3Only] = useState(false);

  interface MediaQueryMatch {
    matches: boolean;
  }

  type HandleMediaQuery = (mediaQuery: MediaQueryMatch) => void;

  const handleMediaQuery: HandleMediaQuery = useCallback(
    mediaQuery => setIsGroup3Only(mediaQuery.matches),
    [],
  );

  useMediaQuery(group3OnlyQuery, handleMediaQuery);

  const calculatedSummaries = summaries.slice(0, 4);

  if (calculatedSummaries.length === 0) {
    return null;
  }

  const hasMultiplePromos = calculatedSummaries.length > 1;
  const firstPromo = calculatedSummaries[0];

  return (
    <div data-testid="billboard-curation-grid">
      {hasMultiplePromos ? (
        <ul css={styles.list} role="list" data-testid="topic-promos">
          {calculatedSummaries.map(promo => (
            <li css={styles.item} key={promo.id}>
              <CurationPromo
                {...promo}
                lazy
                headingLevel={3}
                isBillboardContext
              />
            </li>
          ))}
        </ul>
      ) : (
        <div css={styles.item}>
          <CurationPromo
            {...firstPromo}
            lazy
            headingLevel={3}
            isBillboardContext
          />
        </div>
      )}
    </div>
  );
};

export default BillboardCurationGrid;
