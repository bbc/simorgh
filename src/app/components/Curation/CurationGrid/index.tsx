/** @jsx jsx */
import { jsx } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
  eventTrackingData,
}: CurationGridProps) => {
  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];

  const viewTracker = useViewTracker(eventTrackingData);
  if (summaries.length === 0) {
    return null;
  }
  return (
    <div data-testid="curation-grid-normal" {...viewTracker}>
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
                  eventTrackingData={eventTrackingData}
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
            eventTrackingData={eventTrackingData}
          />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
