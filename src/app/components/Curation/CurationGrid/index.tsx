/** @jsx jsx */
import { jsx } from '@emotion/react';
import { VISUAL_PROMINENCE, Summary } from '#app/models/types/curationData';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import HighImpactPromo from '../HighImpactPromo';
import { CurationGridProps } from '../types';

const isMediaType = (promo: Summary): boolean => {
  return ['video', 'audio', 'photogallery'].includes(promo.type);
};

const isHighImpact = (promo: Summary): boolean => {
  return (
    promo.visualProminence === VISUAL_PROMINENCE.MAXIMUM && !isMediaType(promo)
  );
};

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
}: CurationGridProps) => {
  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];

  if (summaries.length === 0) {
    return null;
  }

  const hasHighImpactPromo = summaries.some(isHighImpact);

  const renderPromo = (promo: Summary, index: number) => {
    const isFirstPromo = index === 0;
    const lazyLoadImages = !(isFirstPromo && isFirstCuration);

    if (isHighImpact(promo)) {
      return <HighImpactPromo {...promo} lazy={lazyLoadImages} />;
    }

    return (
      <CurationPromo
        {...promo}
        lazy={lazyLoadImages}
        headingLevel={headingLevel}
      />
    );
  };

  return (
    <div data-testid="curation-grid-normal">
      {hasMultiplePromos ? (
        <ul
          css={[styles.list, hasHighImpactPromo && styles.listStretchHeight]}
          role="list"
          data-testid="topic-promos"
        >
          {summaries.map((promo, index) => (
            <li css={styles.item} key={promo.id}>
              {renderPromo(promo, index)}
            </li>
          ))}
        </ul>
      ) : (
        <div css={styles.item}>{renderPromo(firstPromo, 0)}</div>
      )}
    </div>
  );
};

export default CurationGrid;
