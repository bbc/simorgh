import moment from 'moment';
import styles from './index.styles';
import CurationPromo from '../../Curation/CurationPromo';
import { CurationGridProps } from '../../Curation/types';

const BillboardCurationGrid = ({
  summaries,
  eventTrackingData,
}: CurationGridProps) => {
  const top4SummariesForGrid = summaries.slice(0, 4);

  if (top4SummariesForGrid.length === 0) return null;

  const hasMultiplePromos = top4SummariesForGrid.length > 1;
  const firstPromo = top4SummariesForGrid[0];

  const withItemTracking = (promo: typeof firstPromo, index: number) => ({
    ...eventTrackingData,
    itemTracker: {
      type: 'billboard-grid-promo',
      text: promo.title,
      position: index + 1,
      resourceId: promo.id || promo.link,
      ...(promo.type && { mediaType: promo.type }),
      ...(promo.duration && {
        duration: moment.duration(promo.duration, 'seconds').asMilliseconds(),
      }),
    },
  });

  return (
    <div data-testid="billboard-curation-grid">
      {hasMultiplePromos ? (
        <ul css={styles.list} role="list" data-testid="billboard-promos">
          {top4SummariesForGrid.map((promo, i) => (
            <li css={styles.item} key={promo.id || promo.link}>
              <CurationPromo
                {...promo}
                lazy
                headingLevel={3}
                eventTrackingData={withItemTracking(promo, i)}
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
            eventTrackingData={withItemTracking(firstPromo, 0)}
          />
        </div>
      )}
    </div>
  );
};

export default BillboardCurationGrid;
