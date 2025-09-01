/** @jsx jsx */
import { jsx } from '@emotion/react';
import { VISUAL_PROMINENCE, Summary } from '#app/models/types/curationData';
import extractWorldServiceFromUrl from '#app/lib/utilities/extractWorldServiceFromUrl';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import moment from 'moment';
import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
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
  eventTrackingData,
}: CurationGridProps) => {
  const { isLite } = use(RequestContext);

  const hasMultiplePromos = summaries.length > 1;
  const firstPromo = summaries[0];

  if (summaries.length === 0) {
    return null;
  }

  const hasHighImpactPromo = summaries.some(
    promo => isHighImpact(promo) && !isMediaType(promo),
  );

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
  });

  const renderPromo = (promo: Summary, index: number) => {
    const isFirstPromo = index === 0;
    const lazyLoadImages = !(isFirstPromo && isFirstCuration);
    const service = extractWorldServiceFromUrl(promo.link);

    if (isHighImpact(promo) && !isMediaType(promo) && !isLite) {
      if (service) {
        return (
          <ServiceContextProvider service={service}>
            <HighImpactPromo
              {...promo}
              lazy={lazyLoadImages}
              eventTrackingData={buildPromoEventTrackingData(promo, index)}
            />
          </ServiceContextProvider>
        );
      }
      return (
        <HighImpactPromo
          {...promo}
          lazy={lazyLoadImages}
          eventTrackingData={buildPromoEventTrackingData(promo, index)}
        />
      );
    }

    return (
      <CurationPromo
        {...promo}
        lazy={lazyLoadImages}
        headingLevel={headingLevel}
        eventTrackingData={buildPromoEventTrackingData(promo, index)}
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
