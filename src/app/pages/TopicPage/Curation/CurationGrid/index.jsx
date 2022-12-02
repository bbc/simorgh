import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';

const CurationGrid = ({ promos, headingLevel }) => {
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

            return (
              <li css={styles.item} key={promo.id}>
                <CurationPromo
                  {...promo}
                  headingLevel={headingLevel}
                  lazy={!isFirstPromo}
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

CurationGrid.propTypes = {
  promos: arrayOf(shape({})),
  headingLevel: number,
};

CurationGrid.defaultProps = {
  promos: [],
  headingLevel: 2,
};

export default CurationGrid;
