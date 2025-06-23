/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import { EventTrackingBlock } from '#app/models/types/eventTracking';
import SectionLabel from '#psammead/psammead-section-label/src';
import PromoItem from '#components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#components/OptimoPromos/PromoList';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
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
  experimentName?: string;
};

const renderTopStoriesList = ({
  item,
  index,
  eventTrackingData,
  viewTracker,
  experimentName,
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
        experimentName={experimentName}
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

  const experimentName = 'dummy_experiment_1';
  const experimentVariation = useOptimizelyVariation(experimentName);

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
      sendOptimizelyEvents,
      experimentVariation,
      experimentName,
    },
  };
  const eventTrackingDataSend = eventTrackingData?.block;
  const viewTracker = useViewTracker(eventTrackingDataSend);

  // uncomment out to render experimentVariation
  // let experimentText;

  // if (experimentVariation != null) {
  //   experimentText =
  //     (experimentVariation as unknown as string) ??
  //     'No Experiment Variation Found';
  // }

  // console.log(experimentText);

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
        {/* uncomment out to render experimentVariation */}
        {/* {experimentText} */}
      </SectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem
          item={content[0]}
          ariaLabelledBy={ariaLabelledBy}
          ref={viewTracker}
          eventTrackingData={eventTrackingData}
          experimentName={experimentName}
        />
      ) : (
        <PromoList css={styles.promoList}>
          {content.map((item, index) =>
            renderTopStoriesList({
              item,
              index,
              eventTrackingData,
              viewTracker,
              experimentName,
            }),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default TopStoriesSection;
