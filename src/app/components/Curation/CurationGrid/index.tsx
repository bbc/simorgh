import { use } from 'react';
import { VISUAL_PROMINENCE, Summary } from '#app/models/types/curationData';
import extractWorldServiceFromUrl from '#app/lib/utilities/extractWorldServiceFromUrl';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import moment from 'moment';
import { RequestContext } from '#app/contexts/RequestContext';
import isMedia from '#app/lib/utilities/isMedia';
import styles from './index.styles';
import CurationPromo from '../CurationPromo';
import HighImpactPromo from '../HighImpactPromo';
import { CurationGridProps } from '../types';

const isHighImpact = ({ visualProminence }: Summary): boolean =>
  visualProminence === VISUAL_PROMINENCE.MAXIMUM;

const CurationGrid = ({
  summaries,
  isFirstCuration,
  headingLevel,
  eventTrackingData,
  timeOfDayExperimentName,
  timeOfDayVariant,
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
      return (
        <CurationPromo
          {...commonProps}
          headingLevel={headingLevel}
          timeOfDayExperimentName={timeOfDayExperimentName || undefined}
          timeOfDayVariant={timeOfDayVariant}
        />
      );
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
