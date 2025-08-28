/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import { CurationGridProps } from '../types';
import { Summary } from '../../../models/types/curationData';

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
  eventTrackingData,
}: CurationGridProps) => {
  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];

  if (summaries.length === 0) {
    return null;
  }

  const buildPromoEventTrackingData = (promo: Summary, i: number) => ({
    itemTracker: {
      type: 'simple-curation-grid-promo',
      text: promo.title,
      position: i + 1,
      resourceId: promo.id,
      ...(promo.type && { mediaType: promo.type }),
      ...(promo.duration && {
        duration: moment.duration(promo.duration, 'seconds').asMilliseconds(),
      }),
    },
    ...eventTrackingData,
    componentName: eventTrackingData?.componentName ?? 'someComponentName',
  });

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
                  eventTrackingData={buildPromoEventTrackingData(promo, index)}
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
            eventTrackingData={buildPromoEventTrackingData(firstPromo, 0)}
          />
        </div>
      )}
    </div>
  );
};

export default CurationGrid;
