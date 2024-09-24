/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';

import SectionLabel from '#psammead/psammead-section-label/src';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import PromoItem from '../../../../legacy/components/OptimoPromos/PromoItem/index.styles';
import PromoList from '../../../../legacy/components/OptimoPromos/PromoList';
import useViewTracker from '../../../../hooks/useViewTracker';
import generatePromoId from '../../../../lib/utilities/generatePromoId';
import LatestMediaItem from './LatestMediaItem';
import styles from './index.styles';
import { LatestMedia } from './types';
import { EventTrackingBlock } from '../../../../models/types/eventTracking';

const renderLatestMediaList = (
  item: LatestMedia,
  index: number,
  eventTrackingData: EventTrackingBlock,
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
    <PromoItem key={index} css={styles.latestMediaPromoBorderAndWidth}>
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
      componentName: 'latest',
    },
  };

  const eventTrackingDataSend = eventTrackingData?.block;

  const viewRef = useViewTracker(eventTrackingDataSend);
  const LABEL_ID = 'latest-media-heading';

  if (!content || content?.length === 0) return null;

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
      css={styles.latestMediaSection}
      aria-labelledby={LABEL_ID}
      role="region"
    >
      <SectionLabel
        columnType="secondary"
        dir={dir}
        href=""
        labelId={LABEL_ID}
        linkText=""
        script={script}
        service={service}
        backgroundColor="transparent"
        overrideHeadingAs=""
        visuallyHidden={false}
        css={styles.sectionTitle}
      >
        {translations.latestMediaTitle ?? 'Latest'}
      </SectionLabel>
      {hasSingleItem ? (
        <div css={styles.latestMediaPromoBorderAndWidth}>
          <LatestMediaItem
            item={singleItem}
            ariaLabelledBy={ariaLabelledBy}
            ref={viewRef}
            eventTrackingData={eventTrackingData}
          />
        </div>
      ) : (
        <PromoList css={styles.latestMediaGridWrapper}>
          {content.map((item, index) =>
            renderLatestMediaList(item, index, eventTrackingData, viewRef),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default LatestMediaSection;
