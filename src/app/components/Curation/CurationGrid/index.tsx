import { use } from 'react';

import moment from 'moment';

import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import extractWorldServiceFromUrl from '#app/lib/utilities/extractWorldServiceFromUrl';
import isMedia from '#app/lib/utilities/isMedia';
import {
  type Summary,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import CurationPromo from '../CurationPromo';
import HighImpactPromo from '../HighImpactPromo';
import type { CurationGridProps } from '../types';
import styles from './index.styles';

const isHighImpact = ({ visualProminence }: Summary): boolean =>
  visualProminence === VISUAL_PROMINENCE.MAXIMUM;

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
    promo => isHighImpact(promo) && !isMedia(promo.type),
  );

  const buildPromoEventTrackingData = (promo: Summary, i: number) => {
    const componentName =
      eventTrackingData?.componentName || 'simple-curation-grid';
    const promoType = `${componentName}-promo`;
    return {
      itemTracker: {
        type: promoType,
        text: promo.title,
        position: i + 1,
        resourceId: promo.id,
        ...(promo.type && { mediaType: promo.type }),
        ...(promo.duration && {
          duration: moment.duration(promo.duration, 'seconds').asMilliseconds(),
        }),
      },
      ...eventTrackingData,
    };
  };

  const renderPromo = (promo: Summary, index: number) => {
    const isFirstPromo = index === 0;
    const service = extractWorldServiceFromUrl(promo.link);
    const shouldUseHighImpact =
      isHighImpact(promo) && !isMedia(promo.type) && !isLite;

    const commonProps = {
      ...promo,
      lazy: !(isFirstPromo && isFirstCuration),
      eventTrackingData: buildPromoEventTrackingData(promo, index),
      position: index,
    };
    if (!shouldUseHighImpact) {
      return <CurationPromo {...commonProps} headingLevel={headingLevel} />;
    }

    return service ? (
      <ServiceContextProvider service={service}>
        <HighImpactPromo {...commonProps} />
      </ServiceContextProvider>
    ) : (
      <HighImpactPromo {...commonProps} />
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
