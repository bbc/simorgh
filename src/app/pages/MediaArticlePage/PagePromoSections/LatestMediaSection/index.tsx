/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import PromoItem from '#app/legacy/components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#app/legacy/components/OptimoPromos/PromoList';
import SectionLabel from '#psammead/psammead-section-label/src';
import generatePromoId from '../generatePromoId';
import LatestMediaItem from './LatestMediaItem';
import styles from './index.styles';
import {
  LatestMedia,
  TrackingBlock,
  EventTrackingData,
} from './LatestMediaTypes';

const renderLatestMediaList = (
  item: LatestMedia,
  index: number,
  eventTrackingData: EventTrackingData,
  viewRef: () => Promise<void>,
) => {
  const ariaLabelledBy = generatePromoId({
    sectionType: 'latest-media',
    assetUri: null,
    canonicalUrl: item.link,
    uri: null,
    contentType: item.type,
    index,
  });

  return (
    <PromoItem key={index} css={styles.LatestMediaPromoBorderAndWidth}>
      <LatestMediaItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </PromoItem>
  );
};

const LatestMediaSection = ({ content }: { content: LatestMedia[] | null }) => {
  const { service, dir, translations, script } = useContext(ServiceContext);

  const eventTrackingData = {
    block: {
      componentName: 'latest-media',
    },
  };
  const eventTrackingDataSend = path<TrackingBlock>(
    ['block'],
    eventTrackingData,
  );
  const viewRef = useViewTracker(eventTrackingDataSend);
  const LABEL_ID = 'latest-media-heading';

  if (!content || isEmpty(content)) return null;
  const hasSingleItem = content.length === 1;
  const singleItem = content[0];
  const ariaLabelledBy = generatePromoId({
    sectionType: 'latest-media',
    assetUri: null,
    canonicalUrl: singleItem.link,
    uri: null,
    contentType: singleItem.type,
    index: 0,
  });

  return (
    <section
      css={styles.LatestMediaSection}
      aria-labelledby={LABEL_ID}
      role="region"
    >
      <SectionLabel
        columnType="secondary"
        dir={dir}
        href={null}
        labelId={LABEL_ID}
        linkText={null}
        script={script}
        service={service}
        backgroundColor="transparent"
        overrideHeadingAs={null}
        visuallyHidden={false}
        css={styles.SectionTitle}
      >
        {translations.latestMediaTitle ?? 'Latest'}
      </SectionLabel>
      {hasSingleItem ? (
        <div css={styles.LatestMediaPromoBorderAndWidth}>
          <LatestMediaItem
            item={singleItem}
            ariaLabelledBy={ariaLabelledBy}
            ref={viewRef}
            eventTrackingData={eventTrackingData}
          />
        </div>
      ) : (
        <PromoList css={styles.LatestMediaGridWrapper}>
          {content.map((item, index) =>
            renderLatestMediaList(item, index, eventTrackingData, viewRef),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default LatestMediaSection;
