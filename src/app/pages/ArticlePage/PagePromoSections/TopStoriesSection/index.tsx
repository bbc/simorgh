/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import { EventTrackingBlock } from '#app/models/types/eventTracking';
import SectionLabel from '#psammead/psammead-section-label/src';
import PromoItem from '#components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#components/OptimoPromos/PromoList';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import styles from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../../../../lib/utilities/generatePromoId';
import { TopStoryItem } from './types';

type TopStoriesListProps = {
  item: TopStoryItem;
  index: number;
  eventTrackingData: EventTrackingBlock;
  viewTracker: React.Ref<HTMLDivElement>;
};

const renderTopStoriesList = ({
  item,
  index,
  eventTrackingData,
  viewTracker,
}: TopStoriesListProps) => {
  const contentType = item?.contentType ?? '';
  const assetUri = item?.locators?.assetUri ?? '';
  const canonicalUrl = item?.locators?.canonicalUrl ?? '';
  const uri = item?.uri ?? '';

  const ariaLabelledBy = generatePromoId({
    sectionType: 'top-stories',
    assetUri,
    canonicalUrl,
    uri,
    contentType,
    index,
  });

  return (
    <PromoItem css={styles.promoItem} key={ariaLabelledBy}>
      <TopStoriesItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewTracker}
        eventTrackingData={eventTrackingData}
      />
    </PromoItem>
  );
};

const TopStoriesSection = ({
  content = [],
  sendOptimizelyEvents,
}: {
  content: TopStoryItem[];
  sendOptimizelyEvents?: boolean;
}) => {
  const { translations, script, service } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'top_stories',
      }),
    },
  };
  const viewTracker = useViewTracker(eventTrackingData?.block);

  const {
    palette: { GREY_2 },
  } = useTheme();

  if (!content || content?.length === 0) return null;

  const title = translations?.topStoriesTitle ?? 'Top Stories';
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';

  const contentType = content?.[0]?.contentType ?? '';
  const assetUri = content?.[0]?.locators?.assetUri ?? '';
  const uri = content?.[0]?.uri ?? '';
  const ariaLabelledBy = generatePromoId({
    sectionType: 'top-stories',
    assetUri,
    uri,
    contentType,
  });

  return (
    <section
      css={styles.topStoriesSection}
      aria-labelledby={LABEL_ID}
      role="region"
      data-e2e={LABEL_ID}
    >
      <SectionLabel
        css={styles.sectionLabel}
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={GREY_2}
        script={script}
        service={service}
      >
        {title}
      </SectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem
          item={content[0]}
          ariaLabelledBy={ariaLabelledBy}
          {...viewTracker}
          eventTrackingData={eventTrackingData}
        />
      ) : (
        <PromoList css={styles.promoList} {...viewTracker}>
          {content.map((item, index) =>
            renderTopStoriesList({
              item,
              index,
              eventTrackingData,
              viewTracker,
            }),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default TopStoriesSection;
