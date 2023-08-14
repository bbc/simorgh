/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({
  promos,
  headingLevel,
  visualProminence,
  visualStyle,
}: CurationGridProps) => {
  const hasMultiplePromos = promos.length > 1;
  const firstPromo = promos[0];

  if (promos.length === 0) {
    return null;
  }

  const isLowProminenceLinks =
    visualProminence === VISUAL_PROMINENCE.LOW &&
    visualStyle === VISUAL_STYLE.LINKS;

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
                  hideImage={isLowProminenceLinks}
                  hideTimestamp={isLowProminenceLinks}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item} key={firstPromo.id}>
          <CurationPromo
            {...firstPromo}
            hideImage={isLowProminenceLinks}
            hideTimestamp={isLowProminenceLinks}
          />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
