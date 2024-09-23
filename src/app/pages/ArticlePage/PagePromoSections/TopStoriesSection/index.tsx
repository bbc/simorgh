/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import React, { useContext } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import { EventTrackingBlock } from '#app/models/types/eventTracking';
import SectionLabel from '#psammead/psammead-section-label/src';
import PromoItem from '#components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#components/OptimoPromos/PromoList';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import styles from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../../../../lib/utilities/generatePromoId';
import { TopStoryItem } from './types';

type TopStoriesListProps = {
  item: TopStoryItem;
  index: number;
  eventTrackingData: EventTrackingBlock;
  viewRef: React.Ref<HTMLDivElement>;
};

const renderTopStoriesList = ({
  item,
  index,
  eventTrackingData,
  viewRef,
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
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </PromoItem>
  );
};

const TopStoriesSection = ({ content = [] }: { content: TopStoryItem[] }) => {
  const { translations, script, service } = useContext(ServiceContext);
  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
    },
  };
  const eventTrackingDataSend = eventTrackingData?.block;
  const viewRef = useViewTracker(eventTrackingDataSend);

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
          ref={viewRef}
          eventTrackingData={eventTrackingData}
        />
      ) : (
        <PromoList css={styles.promoList}>
          {content.map((item, index) =>
            renderTopStoriesList({ item, index, eventTrackingData, viewRef }),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default TopStoriesSection;
