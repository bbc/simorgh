/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import { use } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import SectionLabel from '#psammead/psammead-section-label/src';
import PromoItem from '#components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#components/OptimoPromos/PromoList';
import { ComponentExperimentProps } from '#app/models/types/global';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import styles from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../../../../lib/utilities/generatePromoId';
import { TopStoryItem } from './types';

const TopStoriesSection = ({
  content = [],
  experimentProps,
}: {
  content: TopStoryItem[];
  experimentProps?: ComponentExperimentProps;
}) => {
  const { translations, script, service } = use(ServiceContext);

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
      ...(experimentProps && experimentProps),
    },
  };
  const eventTrackingDataSend = eventTrackingData?.block;
  const viewTracker = useViewTracker(eventTrackingDataSend);

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
  let ariaLabelledBy = generatePromoId({
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
        />
      ) : (
        <PromoList css={styles.promoList}>
          {content.map((item, index) => {
            ariaLabelledBy = generatePromoId({
              sectionType: 'top-stories',
              assetUri: item?.locators?.assetUri ?? '',
              canonicalUrl: item?.locators?.canonicalUrl ?? '',
              uri: item?.uri ?? '',
              contentType: item?.contentType ?? '',
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
          })}
        </PromoList>
      )}
    </section>
  );
};

export default TopStoriesSection;
