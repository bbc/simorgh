/** @jsx jsx */
import { jsx } from '@emotion/react';
import { VISUAL_PROMINENCE, Summary } from '#app/models/types/curationData';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import HighImpactPromo from '../HighImpactPromo';
import { CurationGridProps } from '../types';

const isMediaType = (summary: Summary): boolean => {
  return ['video', 'audio', 'photogallery'].includes(summary.type);
};

const isHighImpact = (summary: Summary): boolean => {
  return summary.visualProminence === VISUAL_PROMINENCE.MAXIMUM;
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

  const hasHighImpactPromo = summaries.some(
    summary => isHighImpact(summary) && !isMediaType(summary),
  );

  const renderPromo = (summary: Summary, index: number) => {
    const isFirstPromo = index === 0;
    const lazyLoadImages = !(isFirstPromo && isFirstCuration);

    if (isHighImpact(summary) && !isMediaType(summary)) {
      return <HighImpactPromo {...summary} lazy={lazyLoadImages} />;
    }

    return (
      <CurationPromo
        {...summary}
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
