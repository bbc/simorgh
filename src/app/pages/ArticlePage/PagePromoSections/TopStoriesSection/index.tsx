/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
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
  viewTracker: React.Ref<HTMLDivElement>;
  experimentFlagKey?: string;
};

const renderTopStoriesList = ({
  item,
  index,
  eventTrackingData,
  viewTracker,
  experimentFlagKey,
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
        experimentFlagKey={experimentFlagKey}
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
  const experimentFlagKey = 'dummy_experiment_1';

  // added in dummy ab test code
  const myExperiementVariation = useOptimizelyVariation(
    // keeping it simple
    experimentFlagKey,
  );

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
      sendOptimizelyEvents,
      optimizelyVariation: myExperiementVariation,
      experimentName: experimentFlagKey,
    },
  };
  const eventTrackingDataSend = eventTrackingData?.block;

  const viewTracker = useViewTracker(eventTrackingDataSend);

  let myExperimentText;

  if (myExperiementVariation != null) {
    myExperimentText =
      (myExperiementVariation as unknown as string) ??
      'No Experiment Variation Found';
  }

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
          ref={viewTracker}
          eventTrackingData={eventTrackingData}
          experimentFlagKey={experimentFlagKey}
        />
      ) : (
        <PromoList css={styles.promoList}>
          {content.map((item, index) =>
            renderTopStoriesList({
              item,
              index,
              eventTrackingData,
              viewTracker,
              experimentFlagKey,
            }),
          )}
        </PromoList>
      )}
      <span>{myExperimentText}</span>
    </section>
  );
};

export default TopStoriesSection;
